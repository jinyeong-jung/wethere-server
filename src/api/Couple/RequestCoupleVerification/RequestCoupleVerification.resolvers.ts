import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  RequestCoupleVerificationMutationArgs,
  RequestCoupleVerificationResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Couple from "../../../entities/Couple";
import CoupleVerification from "../../../entities/CoupleVerification";
import { sendCoupleVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
  Mutation: {
    RequestCoupleVerification: privateResolver(
      async (
        _,
        args: RequestCoupleVerificationMutationArgs,
        { req }
      ): Promise<RequestCoupleVerificationResponse> => {
        const user: User = req.user;
        const { partnerPhoneNumber } = args;
        try {
          // #1. check if the user already has a verified couple
          const existingCoupleOne = await Couple.findOne({
            partnerOne: user,
            verified: true
          });
          const existingCoupleTwo = await Couple.findOne({
            partnerTwo: user,
            verified: true
          });
          if (existingCoupleOne || existingCoupleTwo) {
            return {
              ok: false,
              error: "이미 커플로 등록되어 있습니다."
            };
          } else {
            // #2. check if existing couple verification exists
            // remove exisiting couple verification & couple data
            const existingCoupleVerification = await CoupleVerification.findOne(
              {
                payload: partnerPhoneNumber
              }
            );

            const coupleToDelete = await Couple.findOne({
              coupleVerification: existingCoupleVerification
            });

            if (coupleToDelete) {
              await coupleToDelete.remove();
            }

            if (existingCoupleVerification) {
              await existingCoupleVerification.remove();
            }

            // #3. create a new couple verification
            const newCoupleVerification = await CoupleVerification.create({
              payload: partnerPhoneNumber
            }).save();

            // #4. create a new couple
            const newCouple = await Couple.create({
              partnerOne: user,
              coupleVerification: newCoupleVerification
            }).save();

            // Saving user data
            user.coupleForPartnerOneId = newCouple.id;
            user.coupleForPartnerOne = newCouple;
            await user.save();

            // Saving couple verification data
            newCoupleVerification.couple = newCouple;
            await newCoupleVerification.save();

            // #5. send message w/ verification code to partner phone number
            await sendCoupleVerificationSMS(
              newCoupleVerification.key,
              newCoupleVerification.payload
            );
            return {
              ok: true,
              error: null
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
