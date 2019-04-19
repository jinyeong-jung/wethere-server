import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetChatQueryArgs, GetChatResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Query: {
    GetChat: privateResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne({
            id: args.chatId
          });

          if (chat) {
            if (
              chat.coupleId === user.coupleForPartnerOneId ||
              chat.coupleId === user.coupleForPartnerTwoId
            ) {
              return {
                ok: true,
                error: null,
                chat
              };
            } else {
              return {
                ok: false,
                error: "접근 권한이 없습니다",
                chat: null
              };
            }
          } else {
            return {
              ok: false,
              error: "채팅방이 존재하지 않습니다",
              chat: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            chat: null
          };
        }
      }
    )
  }
};

export default resolvers;
