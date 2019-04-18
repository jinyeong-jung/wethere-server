import { GetFeedsResponse, GetFeedsQueryArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Feed from "../../../entities/Feed";

const resolvers: Resolvers = {
  Query: {
    GetFeeds: privateResolver(
      async (
        _,
        args: GetFeedsQueryArgs,
        { req }
      ): Promise<GetFeedsResponse> => {
        const user: User = req.user;
        try {
          const feeds = await Feed.find({
            user,
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
