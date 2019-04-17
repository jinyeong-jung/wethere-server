import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetPlacesResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Query: {
    GetPlaces: privateResolver(
      async (_, __, { req }): Promise<GetPlacesResponse> => {
        const user: User = req.user;
        try {
          const coupleOne = await Couple.findOne(
            { partnerOne: user },
            { relations: ["places"] }
          );
          const coupleTwo = await Couple.findOne(
            { partnerTwo: user },
            { relations: ["places"] }
          );
          const couple = coupleOne || coupleTwo;
          if (couple) {
            return {
              ok: true,
              error: null,
              places: couple.places
            };
          } else {
            return {
              ok: false,
              error: "저장된 장소가 없습니다",
              places: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            places: null
          };
        }
      }
    )
  }
};

export default resolvers;
