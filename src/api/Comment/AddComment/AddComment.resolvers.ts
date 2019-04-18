import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  AddCommentMutationArgs,
  AddCommentResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Comment from "../../../entities/Comment";
import Feed from "../../../entities/Feed";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Mutation: {
    AddComment: privateResolver(
      async (
        _,
        args: AddCommentMutationArgs,
        { req }
      ): Promise<AddCommentResponse> => {
        const user: User = req.user;
        try {
          const feed = await Feed.findOne(
            { id: args.feedId },
            { relations: ["couple"] }
          );
          const coupleOne = await Couple.findOne({ partnerOne: user });
          const coupleTwo = await Couple.findOne({ partnerTwo: user });
          const couple = coupleOne || coupleTwo;
          if (feed) {
            if (couple!.id === feed.couple.id) {
              await Comment.create({
                feed,
                user,
                text: args.text
              }).save();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "댓글 작성 권한이 없습니다."
              };
            }
          } else {
            return {
              ok: false,
              error: "게시글을 찾을 수 없습니다."
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
