import { Resolvers } from "src/types/resolvers";
import {
  GoogleLoginMutationArgs,
  GoogleLoginResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    GoogleLogin: async (
      _,
      args: GoogleLoginMutationArgs
    ): Promise<GoogleLoginResponse> => {
      const { googleId, name, imageUrl } = args;

      //   googleId duplication check
      try {
        const existingUser = await User.findOne({ googleId });
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
          googleId,
          nickname: name,
          loginProvider: "GOOGLE"
        });
        //   profile image t/f check
        if (imageUrl) {
          user.profilePhoto = imageUrl;
        }
        await user.save();
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
