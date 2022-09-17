import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { PetEntity } from "@core/entity/pet.entity";
import { UpdatePetInterface, UpdatePetUseCaseParams } from "./update-pet.interface";

import { PetRepositoryInterface } from "../../../providers/data/pet-repository.interface";
import { IPetDbModel } from "src/infra/data/models/pet.model";

@injectable()
export class UpdatePetUseCase implements UpdatePetInterface {

  private _petRepository: PetRepositoryInterface;

  constructor(
    @inject(TYPES.PetRepositoryInterface) petRepository: PetRepositoryInterface
  ) {
    this._petRepository = petRepository;
  }

  async execute(id: string, body: UpdatePetUseCaseParams): Promise<void> {
    const petFromDb = this._petRepository.findById(id)

    if (!petFromDb) {
      throw new Error("Pet does not exists");
    }

    await this._petRepository.update(id, body);
  }
}