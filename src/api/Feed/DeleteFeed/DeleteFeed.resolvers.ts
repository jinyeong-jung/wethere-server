import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  DeleteFeedMutationArgs,
  DeleteFeedResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Feed from "../../../entities/Feed";
import Comment from "../../../entities/Comment";

const resolvers: Resolvers = {
  Mutation: {
    DeleteFeed: privateResolver(
      async (
        _,
        args: DeleteFeedMutationArgs,
        { req }
      ): Promise<DeleteFeedResponse> => {
        const user: User = req.user;
        try {
          const feed = await Feed.findOne(
            {
              id: args.feedId
            },
            { relations: ["user"] }
          );
          const comments = await Comment.find({
            feedId: args.feedId
          });
          if (feed) {
            if (feed.user.id === user.id) {
              if (comments) {
                comments.map(async comment => {
                  if (comment) {
                    await comment.remove();
                  }
                });
              }
              await feed.remove();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "삭제 권한이 없습니다."
              };
            }
          } else {
            return {
              ok: false,
              error: "해당하는 피드가 존재하지 않습니다."
            };
          }
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
