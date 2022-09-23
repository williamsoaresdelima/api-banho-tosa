import { model, Model, Schema } from "mongoose";

export interface IOwnerDbModel {
  name: string;
  phone: string;
  address: {
    cep: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string
  }
}

const OwnerSchema = new Schema<IOwnerDbModel>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    cep: { type: String },
    logradouro: { type: String },
    numero: { type: String },
    complemento: { type: String },
    bairro: { type: String },
    localidade: { type: String },
    uf: { type: String },
  }
});

export const OwnerDbModel: Model<IOwnerDbModel> = model('owners', OwnerSchema);