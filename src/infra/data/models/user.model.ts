import * as bcrypt from 'bcrypt';
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

UserSchema.pre("save", async function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    try {
      const hash = await bcrypt.hash(user.password, 8);
      
      user.password = hash

      next();
    } catch (error) {
      return next(error)
    }
  } else {
    return next()
  }
})

export const UserDbModel: Model<IUserDbModel> = model('users', UserSchema);
