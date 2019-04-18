import { Resolvers } from "../../../types/resolvers";
import {
  GetCommentsQueryArgs,
  GetCommentsResponse
} from "../../../types/graph";
import Comment from "../../../entities/Comment";

const resolvers: Resolvers = {
  Query: {
    GetComments: async (
      _,
      args: GetCommentsQueryArgs
    ): Promise<GetCommentsResponse> => {
      try {
        const comments = await Comment.find({ feedId: args.feedId });
        if (comments) {
          return {
            ok: true,
            error: null,
            comments
          };
        } else {
          return {
            ok: false,
            error: "댓글이 없습니다.",
            comments: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          comments: null
        };
      }
    }
  }
};

export default resolvers;
