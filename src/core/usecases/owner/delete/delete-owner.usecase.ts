import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";

import { DeleteOwnerInterface } from "./delete-owner.interface";

import { OwnerRepositoryInterface } from "../../../providers/data/owner-repository.interface";

@injectable()
export class DeleteOwnerUseCase implements DeleteOwnerInterface {

  private _ownerRepository: OwnerRepositoryInterface;

  constructor(
    @inject(TYPES.OwnerRepositoryInterface) ownerRepository: OwnerRepositoryInterface
  ) {
    this._ownerRepository = ownerRepository;
  }

  async execute(id: string): Promise<void> {
    const owner = await this._ownerRepository.findById(id);

    if (!owner) {
      throw new Error("Owner not found");
    }

    await this._ownerRepository.delete(id);
  }
}
