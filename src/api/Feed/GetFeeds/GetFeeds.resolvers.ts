import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetFeedsResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Couple from "../../../entities/Couple";
import Feed from "../../../entities/Feed";

const resolvers: Resolvers = {
  Query: {
    GetFeeds: privateResolver(
      async (_, __, { req }): Promise<GetFeedsResponse> => {
        const user: User = req.user;
        try {
          const coupleOne = await Couple.findOne(
            { partnerOne: user },
            { relations: ["feeds"] }
          );
          const coupleTwo = await Couple.findOne(
            { partnerTwo: user },
            { relations: ["feeds"] }
          );
          const couple = coupleOne || coupleTwo;

          const feeds = await Feed.find({
            couple
          });

          if (couple) {
            return {
              ok: true,
              error: null,
              feeds
            };
          } else {
            return {
              ok: false,
              error: "피드가 없습니다",
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
