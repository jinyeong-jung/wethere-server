import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  PlaceDetailQueryArgs,
  PlaceDetailResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Query: {
    PlaceDetail: privateResolver(
      async (
        _,
        args: PlaceDetailQueryArgs,
        { req }
      ): Promise<PlaceDetailResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne(
            {
              id: args.placeId
            },
            { relations: ["couple"] }
          );

          if (place) {
            const coupleOne = await Couple.findOne({ partnerOne: user });
            const coupleTwo = await Couple.findOne({ partnerTwo: user });
            const couple = coupleOne || coupleTwo;

            if (place.couple.id === couple!.id) {
              return {
                ok: true,
                error: null,
                place
              };
            } else {
              return {
                ok: false,
                error: "열람 권한이 없습니다.",
                place: null
              };
            }
          } else {
            return {
              ok: false,
              error: "해당 장소가 존재하지 않습니다",
              place: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            place: null
          };
        }
      }
    )
  }
};

export default resolvers;
