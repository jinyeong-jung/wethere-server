import { Resolvers } from "../../../types/resolvers";
import { SignUpEndMutationArgs, SignUpEndResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    SignUpEnd: async (
      _,
      args: SignUpEndMutationArgs
    ): Promise<SignUpEndResponse> => {
      const { phoneNumber, key } = args;

      //   Saving verification data
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key
        });
        if (verification) {
          verification.verified = true;
          await verification.save();
          // Execute try-catch below
        } else {
          return {
            ok: false,
            error: "인증번호를 다시 확인해주세요."
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }

      // Saving user data
      try {
        const user = await User.findOne({ phoneNumber });
        if (user) {
          user.verifiedPhoneNumber = true;
          await user.save();
        } else {
          return {
            ok: false,
            error: "핸드폰 번호를 인증해주세요."
          };
        }
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
