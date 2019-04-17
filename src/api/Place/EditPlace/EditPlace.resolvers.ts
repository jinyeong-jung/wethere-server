import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import cleanNullArg from "../../../utils/cleanNullArg";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        { req }
      ): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne(
            { id: args.placeId },
            { relations: ["couple"] }
          );

          const coupleOne = await Couple.findOne({ partnerOne: user });
          const coupleTwo = await Couple.findOne({ partnerTwo: user });
          const couple = coupleOne || coupleTwo;

          if (place) {
            if (place.couple.id === couple!.id) {
              const notNull = cleanNullArg(args);
              await Place.update({ id: args.placeId }, { ...notNull });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "수정 권한이 없습니다."
              };
            }
          } else {
            return {
              ok: false,
              error: "해당하는 장소가 존재하지 않습니다."
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
