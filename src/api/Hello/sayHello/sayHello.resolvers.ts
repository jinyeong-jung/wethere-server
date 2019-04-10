import { Greeting } from "src/types/graph";

const resolvers = {
  Query: {
    sayHello: (): Greeting => {
      return { text: "hi", error: false };
    }
  }
};

export default resolvers;
