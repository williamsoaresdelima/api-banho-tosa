import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { DeletePetInterface } from "./delete-pet.interface";

import { PetRepositoryInterface } from "../../../providers/data/pet-repository.interface";

@injectable()
export class DeletePetUseCase implements DeletePetInterface {

  private _petRepository: PetRepositoryInterface;

  constructor(
    @inject(TYPES.PetRepositoryInterface) petRepository: PetRepositoryInterface
  ) {
    this._petRepository = petRepository;
  }

  async execute(id: string): Promise<void> {
    const petFromDb = this._petRepository.findById(id)

    if (!petFromDb) {
      throw new Error("Pet does not exists");
    }

    this._petRepository.delete(id)
  }
}