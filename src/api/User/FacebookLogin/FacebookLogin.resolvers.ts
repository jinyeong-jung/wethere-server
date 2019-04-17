import { Resolvers } from "src/types/resolvers";
import {
  FacebookLoginMutationArgs,
  FacebookLoginResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";
import { loginProvider } from "../../../types/types";

const resolvers: Resolvers = {
  Mutation: {
    FacebookLogin: async (
      _,
      args: FacebookLoginMutationArgs
    ): Promise<FacebookLoginResponse> => {
      const { facebookId, name } = args;

      //  facebookId duplication check
      try {
        const existingUser = await User.findOne({ facebookId });
        if (existingUser) {
          const token = createJWT(existingUser.id);
          return {
            ok: true,
            error: null,
            token
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }

      //   create a new user
      try {
        const user = await User.create({
          facebookId,
          nickname: name,
          profilePhoto: `http://graph.facebook.com/${facebookId}/picture?type=square`,
          loginProvider: "FACEBOOK"
        }).save();
        const token = createJWT(user.id);
        return {
          ok: true,
          error: null,
          token
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
