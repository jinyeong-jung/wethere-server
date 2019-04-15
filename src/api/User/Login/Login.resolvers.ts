import { Resolvers } from "src/types/resolvers";
import { LoginMutationArgs, LoginResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    Login: async (_, args: LoginMutationArgs): Promise<LoginResponse> => {
      const { username, password } = args;
      try {
        // #1. check if username exists
        const user = await User.findOne({ username });
        if (user) {
          // #2. check if password is correct
          const checkPassword = await user.comparePassword(password);
          if (checkPassword) {
            return {
              ok: true,
              error: null,
              token: "아직 준비중입니다."
            };
          } else {
            return {
              ok: false,
              error: "비밀번호를 다시 확인해주세요.",
              token: null
            };
          }
        } else {
          return {
            ok: false,
            error:
              "입력하신 아이디가 맞는지 다시 확인해주세요. 소셜 로그인을 하지는 않으셨나요?",
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
