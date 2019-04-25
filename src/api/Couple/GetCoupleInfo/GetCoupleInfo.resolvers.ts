import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetCoupleInfoResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Query: {
    GetCoupleInfo: privateResolver(
      async (_, __, { req }): Promise<GetCoupleInfoResponse> => {
        const user: User = req.user;
        try {
          const coupleOne = await Couple.findOne(
            {
              partnerOneId: user.id
            },
            { relations: ["chat"] }
          );
          const coupleTwo = await Couple.findOne(
            {
              partnerTwoId: user.id
            },
            { relations: ["chat"] }
          );
          const couple = coupleOne || coupleTwo;
          if (couple) {
            return {
              ok: true,
              error: null,
              couple
            };
          } else {
            return {
              ok: false,
              error: "일치하는 커플 정보가 없습니다.",
              couple: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            couple: null
          };
        }
      }
    )
  }
};

export default resolvers;
