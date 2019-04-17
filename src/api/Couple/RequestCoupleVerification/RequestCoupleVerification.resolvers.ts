import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import {
  RequestCoupleVerificationMutationArgs,
  RequestCoupleVerificationResponse
} from "../../../types/graph";

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
          // couple -> partnerOne.id === user.id || partnerTwo.id === user.id
          // couple -> verified === true
          // #2. check if existing couple verification exists (remove)
          // #3. create a new couple verification
          // #4. create a new couple
          // #5. send message w/ verification code to partner phone number
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
