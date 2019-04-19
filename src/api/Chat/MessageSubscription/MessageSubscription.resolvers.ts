const resolvers = {
  Subscription: {
    MessageSubscription: {
      subscribe: (_, __, { pubSub }) => {
        return pubSub.asyncIterator("newChatMessage");
      }
    }
  }
};
