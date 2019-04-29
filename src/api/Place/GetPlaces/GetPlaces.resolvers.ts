import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetPlacesResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Couple from "../../../entities/Couple";
import Place from "../../../entities/Place";

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

          const visitedPlaces = await Place.find({
            couple,
            isVisited: true
          });
          const notVisitedPlaces = await Place.find({
            couple,
            isVisited: false
          });

          if (couple) {
            return {
              ok: true,
              error: null,
              visitedPlaces,
              notVisitedPlaces
            };
          } else {
            return {
              ok: false,
              error: "저장된 장소가 없습니다",
              visitedPlaces: null,
              notVisitedPlaces: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            visitedPlaces: null,
            notVisitedPlaces: null
          };
        }
      }
    )
  }
};

export default resolvers;
