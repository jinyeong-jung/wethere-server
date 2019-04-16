import { Resolvers } from "../../../types/resolvers";
import { GetMyProfileResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: async (_, __, { req }): Promise<GetMyProfileResponse> => {
      const { user } = req;
      return {
        ok: true,
        error: null,
        user
      };
    }
  }
};

export default resolvers;
