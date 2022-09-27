import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";


import { ListOwnerInterface } from "./list-owner.interface";
import { IOwnerDbModel } from "../../../../infra/data/models/owner.model";
import { OwnerRepositoryInterface } from "../../../providers/data/owner-repository.interface";

@injectable()
export class ListOwnerUseCase implements ListOwnerInterface {

  private _ownerRepository: OwnerRepositoryInterface;

  constructor(
    @inject(TYPES.OwnerRepositoryInterface) ownerRepository: OwnerRepositoryInterface
  ) {
    this._ownerRepository = ownerRepository;
  }

  async execute(params: any): Promise<IOwnerDbModel[]> {
    return this._ownerRepository.search(params);
  }
}
