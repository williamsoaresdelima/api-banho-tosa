import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";


import { FindOwnerByIdInterface } from "./find-owner-by-id.interface";
import { IOwnerDbModel } from "../../../../infra/data/models/owner.model";
import { OwnerRepositoryInterface } from "../../../providers/data/owner-repository.interface";

@injectable()
export class FindOwnerByIdOwnerUseCase implements FindOwnerByIdInterface {

  private _ownerRepository: OwnerRepositoryInterface;

  constructor(
    @inject(TYPES.OwnerRepositoryInterface) ownerRepository: OwnerRepositoryInterface
  ) {
    this._ownerRepository = ownerRepository;
  }

  async execute(id: string): Promise<IOwnerDbModel> {
    const owner = await this._ownerRepository.findById(id);

    if (!owner) {
      throw new Error('Owner does not exists!');
    }

    return owner;
  }
}
