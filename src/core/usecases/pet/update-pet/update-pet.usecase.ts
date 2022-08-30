import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { PetEntity } from "@core/entity/pet.entity";
import { UpdatePetInterface, UpdatePetUseCaseParams } from "./update-pet.interface";

import { PetRepositoryInterface } from "../../../providers/data/pet-repository.interface";

@injectable()
export class UpdatePetUseCase implements UpdatePetInterface {

  private _petRepository: PetRepositoryInterface;

  constructor(
    @inject(TYPES.PetRepositoryInterface) petRepository: PetRepositoryInterface
  ) {
    this._petRepository = petRepository;
  }

  execute(id: number, body: UpdatePetUseCaseParams): PetEntity {
    const petFromDb = this._petRepository.findById(id)

    if (!petFromDb) {
      throw new Error("Pet does not exists");
    }

    const result = this._petRepository.update(id, body)

    return result;
  }
}