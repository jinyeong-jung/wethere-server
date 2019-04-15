import { Resolvers } from "src/types/resolvers";
import {
  FacebookLoginMutationArgs,
  FacebookLoginResponse
} from "../../../types/graph";
import User from "../../../entities/User";

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
        await User.create({
          facebookId,
          nickname: name,
          profilePhoto: `http://graph.facebook.com/${facebookId}/picture?type=square`
        }).save();
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
