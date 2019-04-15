import { Resolvers } from "src/types/resolvers";
import { NaverLoginMutationArgs, NaverLoginResponse } from "src/types/graph";
import User from "../../../entities/User";

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

      // create a new user
      try {
        const user = await User.create({
          naverId,
          nickname
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
