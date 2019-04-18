import { Resolvers } from "../../../types/resolvers";
import {
  DeleteCommentMutationArgs,
  DeleteCommentResponse
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Comment from "../../../entities/Comment";

const resolvers: Resolvers = {
  Mutation: {
    DeleteComment: privateResolver(
      async (
        _,
        args: DeleteCommentMutationArgs,
        { req }
      ): Promise<DeleteCommentResponse> => {
        const user: User = req.user;
        try {
          const comment = await Comment.findOne({ id: args.commentId, user });
          if (comment) {
            await comment.remove();
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "댓글이 존재하지 않습니다."
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
