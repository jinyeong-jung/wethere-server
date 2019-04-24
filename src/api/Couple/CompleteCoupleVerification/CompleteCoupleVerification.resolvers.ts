import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  CompleteCoupleVerificationMutationArgs,
  CompleteCoupleVerificationResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import CoupleVerification from "../../../entities/CoupleVerification";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Mutation: {
    CompleteCoupleVerification: privateResolver(
      async (
        _,
        args: CompleteCoupleVerificationMutationArgs,
        { req }
      ): Promise<CompleteCoupleVerificationResponse> => {
        const user: User = req.user;
        const { phoneNumber, key } = args;

        // Saving couple verification data
        try {
          const verification = await CoupleVerification.findOne({
            payload: phoneNumber,
            key
          });
          if (verification) {
            verification.verified = true;
            await verification.save();

            // Saving couple data
            const couple = await Couple.findOne({
              coupleVerification: verification
            });
            if (couple) {
              couple.verified = true;
              couple.partnerTwo = user;
              await couple.save();

              // Saving user data
              user.coupleForPartnerTwoId = couple.id;
              user.coupleForPartnerTwo = couple;
              user.verifiedCouple = true;
              await user.save();

              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error:
                  "등록된 커플 정보가 없습니다. 인증번호를 다시 요청하세요."
              };
            }
          } else {
            return {
              ok: false,
              error: "커플 인증번호를 다시 확인해주세요."
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
