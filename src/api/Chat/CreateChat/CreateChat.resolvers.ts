import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  CreateChatMutationArgs,
  CreateChatResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Couple from "../../../entities/Couple";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Mutation: {
    CreateChat: privateResolver(
      async (
        _,
        args: CreateChatMutationArgs,
        { req }
      ): Promise<CreateChatResponse> => {
        const user: User = req.user;
        try {
          // "구문 오류, \"WHERE\" 부근"
          const coupleOne = await Couple.findOne({
            partnerOneId: user.id
          });
          const coupleTwo = await Couple.findOne({
            partnerTwoId: user.id
          });
          const couple = coupleOne || coupleTwo;

          if (couple && couple.id === args.coupleId) {
            if (!couple.chat) {
              await Chat.create({
                coupleId: couple.id,
                couple
              }).save();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "이미 채팅방이 존재합니다."
              };
            }
          } else {
            return {
              ok: false,
              error: "채팅방 개설 권한이 없습니다."
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
