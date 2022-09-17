import { model, Model, Schema } from "mongoose";

export interface IPetDbModel {
  name: string;
  age: number;
  petType: Schema.Types.ObjectId;
}

const PetSchema = new Schema<IPetDbModel>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  petType: { type: Schema.Types.ObjectId, required: true }
});

export const PetDbModel: Model<IPetDbModel> = model('pets', PetSchema);