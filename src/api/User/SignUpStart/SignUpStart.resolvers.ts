import { Resolvers } from "../../../types/resolvers";
import {
  SignUpStartMutationArgs,
  SignUpStartResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";

const resolvers: Resolvers = {
  Mutation: {
    SignUpStart: async (
      _,
      args: SignUpStartMutationArgs
    ): Promise<SignUpStartResponse> => {
      const { username, password, nickname, gender, phoneNumber } = args;
      try {
        // #1. username duplication check
        const existingUser = User.findOne({ username });
        if (!existingUser) {
          // #2. password check
          const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
          if (passwordRegex.test(password)) {
            // #3. start phone verification
            const existingVerification = await Verification.findOne({
              payload: phoneNumber
            });
            if (existingVerification) {
              existingVerification.remove();
            }
            const newVerification = await Verification.create({
              payload: phoneNumber
            }).save();
            console.log(newVerification);
            return {
              ok: true,
              error: null,
              token: "인증번호를 보냈습니다. 확인해주세요."
            };
          } else {
            return {
              ok: false,
              error: "비밀번호는 특수문자를 포함해 8~16자로 입력해주세요.",
              token: null
            };
          }
        } else {
          return {
            ok: false,
            error: "이미 존재하는 아이디입니다.",
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error,
          token: null
        };
      }
    }
  }
};

export default resolvers;
