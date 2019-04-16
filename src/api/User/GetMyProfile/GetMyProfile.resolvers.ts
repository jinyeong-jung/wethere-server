import { Resolvers } from "../../../types/resolvers";
import { GetMyProfileResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(
      async (_, __, { req }): Promise<GetMyProfileResponse> => {
        const { user } = req;
        return {
          ok: true,
          error: null,
          user
        };
      }
    )
  }
};

export default resolvers;
