import mongoose, { Schema } from "mongoose";

const PetTypeSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

export class PetTypeEntity {
  constructor(public id: number, public name: string) {}

  static build(id: number, name: string): PetTypeEntity {
    return new PetTypeEntity(id, name);
  }

  static createModel() {
    return mongoose.model("PetType", PetTypeSchema);
  }
}
