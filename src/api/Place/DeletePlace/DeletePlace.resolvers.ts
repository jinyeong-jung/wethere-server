import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  DeletePlaceMutationArgs,
  DeletePlaceResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";
import Couple from "../../../entities/Couple";
import Feed from "../../../entities/Feed";

const resolvers: Resolvers = {
  Mutation: {
    DeletePlace: privateResolver(
      async (
        _,
        args: DeletePlaceMutationArgs,
        { req }
      ): Promise<DeletePlaceResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne(
            { id: args.placeId },
            { relations: ["couple"] }
          );

          const feeds = await Feed.find({ placeId: args.placeId });

          if (place) {
            const coupleOne = await Couple.findOne({ partnerOne: user });
            const coupleTwo = await Couple.findOne({ partnerTwo: user });
            const couple = coupleOne || coupleTwo;

            if (place.couple.id === couple!.id) {
              if (feeds) {
                feeds.map(async feed => {
                  if (feed) {
                    await feed.remove();
                  }
                });
              }
              await place.remove();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "삭제 권한이 없습니다."
              };
            }
          } else {
            return {
              ok: false,
              error: "해당 장소가 존재하지 않습니다."
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
