import { Resolvers } from "../../../types/resolvers";
import {
  KakaoLoginMutationArgs,
  KakaoLoginResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    KakaoLogin: async (
      _,
      args: KakaoLoginMutationArgs
    ): Promise<KakaoLoginResponse> => {
      const { kakaoId, nickname, thumbnail } = args;

      //   kakaoId duplication check
      try {
        const existingUser = await User.findOne({ kakaoId });
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
          kakaoId,
          nickname
        });
        //   profile image t/f check
        if (thumbnail) {
          user.profilePhoto = thumbnail;
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
