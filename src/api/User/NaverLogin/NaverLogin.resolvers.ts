import { Resolvers } from "src/types/resolvers";
import { NaverLoginMutationArgs, NaverLoginResponse } from "src/types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";
import { loginProvider } from "../../../types/types";

const resolvers: Resolvers = {
  Mutation: {
    NaverLogin: async (
      _,
      args: NaverLoginMutationArgs
    ): Promise<NaverLoginResponse> => {
      const { naverId, nickname, imageUrl } = args;

      // naverId duplication check
      try {
        const existingUser = await User.findOne({ naverId });
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

      // create a new user
      try {
        const user = await User.create({
          naverId,
          nickname,
          loginProvider: "NAVER"
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
