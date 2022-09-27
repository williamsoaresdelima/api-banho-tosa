import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";

import { UpdateOwnerInterface, UpdateOwnerUseCaseParams } from "./update-owner.interface";
import { OwnerRepositoryInterface } from "../../../providers/data/owner-repository.interface";

@injectable()
export class UpdateOwnerUseCase implements UpdateOwnerInterface {

  private _ownerRepository: OwnerRepositoryInterface;

  constructor(
    @inject(TYPES.OwnerRepositoryInterface) ownerRepository: OwnerRepositoryInterface
  ) {
    this._ownerRepository = ownerRepository;
  }

  async execute(id: string, dto: UpdateOwnerUseCaseParams): Promise<void> {
    const owner = await this._ownerRepository.findById(id);

    if (!owner) {
      throw new Error("Owner not found");
    }

    await this._ownerRepository.update(id, dto);
  }
}
