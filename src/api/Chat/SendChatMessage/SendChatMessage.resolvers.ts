import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  SendChatMessageMutationArgs,
  SendChatMessageResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessage: privateResolver(
      async (
        _,
        args: SendChatMessageMutationArgs,
        { req, pubSub }
      ): Promise<SendChatMessageResponse> => {
        const user: User = req.user;
        const { text, chatId } = args;
        try {
          const chat = await Chat.findOne(
            { id: chatId },
            { relations: ["messages"] }
          );
          if (chat) {
            if (
              chat.coupleId === user.coupleForPartnerOneId ||
              chat.coupleId === user.coupleForPartnerTwoId
            ) {
              // create new message
              const message = await Message.create({
                text,
                chat,
                user
              }).save();
              pubSub.publish("newChatMessage", {
                MessageSubscription: message
              });

              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "메시지 전송 권한이 없습니다."
              };
            }
          } else {
            return {
              ok: false,
              error: "채팅방이 존재하지 않습니다."
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
