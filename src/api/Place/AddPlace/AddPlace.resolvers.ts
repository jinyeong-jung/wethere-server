import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { AddPlaceMutationArgs, AddPlaceResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Mutation: {
    AddPlace: privateResolver(
      async (
        _,
        args: AddPlaceMutationArgs,
        { req }
      ): Promise<AddPlaceResponse> => {
        const user: User = req.user;
        try {
          const coupleOne = await Couple.findOne({
            partnerOne: user
          });
          const coupleTwo = await Couple.findOne({
            partnerTwo: user
          });
          const couple = coupleOne || coupleTwo;
          await Place.create({
            ...args,
            couple
          }).save();
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
    )
  }
};

export default resolvers;
