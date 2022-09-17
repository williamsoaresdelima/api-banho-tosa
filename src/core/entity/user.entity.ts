import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserEntity {
  constructor(public name: string, public email: string, public password: string) {}

  static build(
    name: string,
    email: string,
    password: string
  ): UserEntity {
    return new UserEntity(name, email, password);
  }

  static createModel() {
    return mongoose.model('User', UserSchema)
  }
}
