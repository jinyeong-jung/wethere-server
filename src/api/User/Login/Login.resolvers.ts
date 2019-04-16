import { Resolvers } from "src/types/resolvers";
import { LoginMutationArgs, LoginResponse } from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "src/utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    Login: async (_, args: LoginMutationArgs): Promise<LoginResponse> => {
      const { username, password } = args;
      try {
        // #1. check if username exists
        const user = await User.findOne({ username });
        // #2. check if password is correct
        if (!user) {
          return {
            ok: false,
            error:
              "입력하신 아이디가 맞는지 다시 확인해주세요. 소셜 로그인을 하지는 않으셨나요?",
            token: null
          };
        }
        const checkPassword = user.comparePassword(password);
        if (checkPassword) {
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token
          };
        } else {
          return {
            ok: false,
            error: "비밀번호를 다시 확인해주세요.",
            token: null
          };
        }
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
