import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { DeletePetTypeInterface } from "./delete-pet-type.interface";

import { PetTypeRepositoryInterface } from "../../../providers/data/pet-type-repository.interface";

@injectable()
export class DeletePetTypeUseCase implements DeletePetTypeInterface {

  private _petTypeRepository: PetTypeRepositoryInterface;

  constructor(
    @inject(TYPES.PetTypeRepositoryInterface) petTypeRepository: PetTypeRepositoryInterface
  ) {
    this._petTypeRepository = petTypeRepository;
  }

  async execute(id: string): Promise<void> {
    const petFromDb = this._petTypeRepository.findById(id)

    if (!petFromDb) {
      throw new Error("Pet type does not exists");
    }

    await this._petTypeRepository.delete(id)
  }
}