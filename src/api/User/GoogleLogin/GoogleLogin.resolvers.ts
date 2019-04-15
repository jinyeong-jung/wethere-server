import { Resolvers } from "src/types/resolvers";
import {
  GoogleLoginMutationArgs,
  GoogleLoginResponse
} from "../../../types/graph";
import User from "../../../entities/User";

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
          return {
            ok: true,
            error: null,
            token: "아직 준비중입니다 (이미 존재)."
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
          nickname: name
        });
        //   profile image t/f check
        if (imageUrl) {
          user.profilePhoto = imageUrl;
        }
        await user.save();
        return {
          ok: true,
          error: null,
          token: "아직 준비중입니다 (유저 생성)."
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
