import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { FeedDetailQueryArgs, FeedDetailResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Feed from "../../../entities/Feed";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Query: {
    FeedDetail: privateResolver(
      async (
        _,
        args: FeedDetailQueryArgs,
        { req }
      ): Promise<FeedDetailResponse> => {
        const user: User = req.user;
        try {
          const coupleOne = await Couple.findOne({
            partnerOne: user
          });
          const coupleTwo = await Couple.findOne({
            partnerTwo: user
          });
          const couple = coupleOne || coupleTwo;

          const feed = await Feed.findOne(
            {
              id: args.feedId
            },
            { relations: ["user", "comments", "place"] }
          );

          if (couple && feed) {
            if (feed.coupleId === couple.id) {
              return {
                ok: true,
                error: null,
                feed
              };
            } else {
              return {
                ok: false,
                error: "열람 권한이 없습니다",
                feed: null
              };
            }
          } else {
            return {
              ok: false,
              error: "피드 정보가 없습니다",
              feed: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            feed: null
          };
        }
      }
    )
  }
};

export default resolvers;
