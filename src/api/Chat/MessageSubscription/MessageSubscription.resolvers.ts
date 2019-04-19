import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    MessageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("newChatMessage"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            MessageSubscription: { coupleId }
          } = payload;
          return (
            coupleId === user.coupleForPartnerOneId ||
            coupleId === user.coupleForPartnerTwoId
          );
        }
      )
    }
  }
};

export default resolvers;
