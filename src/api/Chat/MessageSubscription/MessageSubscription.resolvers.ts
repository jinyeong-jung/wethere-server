import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers = {
  Subscription: {
    MessageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("newChatMessage"),
        async (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            MessageSubscription: { coupleId }
          } = payload;
          try {
            const chat = await Chat.findOne({ coupleId });
            if (chat) {
              return (
                coupleId === user.coupleForPartnerOneId ||
                coupleId === user.coupleForPartnerTwoId
              );
            } else {
              return false;
            }
          } catch (error) {
            return false;
          }
        }
      )
    }
  }
};

export default resolvers;
