import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { AddFeedMutationArgs, AddFeedResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";
import Feed from "../../../entities/Feed";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Mutation: {
    AddFeed: privateResolver(
      async (
        _,
        args: AddFeedMutationArgs,
        { req }
      ): Promise<AddFeedResponse> => {
        const user: User = req.user;
        const { placeId, text, feedPicture } = args;
        try {
          const place = await Place.findOne({ id: placeId });
          const coupleOne = await Couple.findOne({ partnerOne: user });
          const coupleTwo = await Couple.findOne({ partnerTwo: user });
          const couple = coupleOne || coupleTwo;

          let notNullFeedPic: string | undefined;

          if (feedPicture) {
            notNullFeedPic = feedPicture;
          }
          await Feed.create({
            text,
            feedPicture: notNullFeedPic,
            couple,
            user,
            place
          }).save();
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
