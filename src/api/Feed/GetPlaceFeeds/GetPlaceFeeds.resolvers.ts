import {
  GetPlaceFeedsResponse,
  GetPlaceFeedsQueryArgs
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Feed from "../../../entities/Feed";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Query: {
    GetPlaceFeeds: privateResolver(
      async (
        _,
        args: GetPlaceFeedsQueryArgs,
        { req }
      ): Promise<GetPlaceFeedsResponse> => {
        const user: User = req.user;
        try {
          const coupleOne = await Couple.findOne({
            partnerOne: user
          });

          const coupleTwo = await Couple.findOne({
            partnerTwo: user
          });

          const couple = coupleOne || coupleTwo;

          const feeds = await Feed.find({
            couple,
            placeId: args.placeId
          });
          if (feeds) {
            return {
              ok: true,
              error: null,
              feeds
            };
          } else {
            return {
              ok: false,
              error: "피드를 불러올 수 없습니다.",
              feeds: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            feeds: null
          };
        }
      }
    )
  }
};

export default resolvers;
