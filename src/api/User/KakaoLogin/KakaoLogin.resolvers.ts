import { Resolvers } from "../../../types/resolvers";
import {
  KakaoLoginMutationArgs,
  KakaoLoginResponse
} from "../../../types/graph";
import User from "../../../entities/User";

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
          kakaoId,
          nickname
        });
        //   profile image t/f check
        if (thumbnail) {
          user.profilePhoto = thumbnail;
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
