import { model, Model, Schema } from "mongoose";

export interface IUserDbModel {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUserDbModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserDbModel: Model<IUserDbModel> = model('users', UserSchema);
