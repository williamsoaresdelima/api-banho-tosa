import mongoose, { model, Model } from "mongoose";

export interface IPetTypeDbModel {
  name: string;
}

const PetTypeSchema = new mongoose.Schema<IPetTypeDbModel>({
  name: { type: String, required: true }
});

export const PetTypeDbModel: Model<IPetTypeDbModel> = model('petTypes', PetTypeSchema);