import mongoose, { Schema } from "mongoose";

const PetSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  petType: { type: Schema.Types.ObjectId, required: true }
});

export class PetEntity {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public petType: number
  ) {}

  static build(
    id: number,
    name: string,
    age: number,
    petType: number
  ): PetEntity {
    return new PetEntity(id, name, age, petType);
  }

  static createModel() {
    return mongoose.model("Pet", PetSchema);
  }
}
