import { Model } from "mongoose";
import { injectable } from "inversify";

import {
  OwnerRepositoryInterface,
  OwnerRespositoryCreateParams,
  OwnerRespositorySearchParams,
} from "@core/providers/data/owner-repository.interface";
import { IOwnerDbModel, OwnerDbModel } from "../models/owner.model";

@injectable()
export class OwnerRepository implements OwnerRepositoryInterface {
  private _ownerDbModel: Model<IOwnerDbModel>;

  constructor() {
    this._ownerDbModel = OwnerDbModel;
  }

  async create(dto: OwnerRespositoryCreateParams): Promise<IOwnerDbModel> {
    const { name, address, phone } = dto;

    const owner = await this._ownerDbModel.create({
      name,
      address,
      phone
    });

    await owner.save();

    return owner;
  }

  async search(model: OwnerRespositorySearchParams): Promise<IOwnerDbModel[]> {
    const owners = await this._ownerDbModel.find();

    return owners;
  }

  async findById(id: string): Promise<IOwnerDbModel> {
    const owner = await this._ownerDbModel.findById(id);

    return owner as any;
  }

  async update(id: string, body: OwnerRespositoryCreateParams): Promise<void> {
    await this._ownerDbModel.updateOne({ _id: id }, { ...body });
  }

  async delete(id: string): Promise<void> {
    await this._ownerDbModel.deleteOne({ _id: id });
  }
}
