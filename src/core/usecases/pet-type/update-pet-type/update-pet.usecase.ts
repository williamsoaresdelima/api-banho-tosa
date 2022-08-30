import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { PetTypeEntity } from "@core/entity/pet-type.entity";
import { PetTypeRepositoryInterface } from "@core/providers/data/pet-type-repository.interface";
import { UpdatePetTypeInterface, UpdatePetTypeUseCaseParams } from "./update-pet.-typeinterface";

@injectable()
export class UpdatePetTypeUseCase implements UpdatePetTypeInterface {

  private _petTypeRepository: PetTypeRepositoryInterface;

  constructor(
    @inject(TYPES.PetTypeRepositoryInterface) petTypeRepository: PetTypeRepositoryInterface
  ) {
    this._petTypeRepository = petTypeRepository;
  }

  execute(id: number, body: UpdatePetTypeUseCaseParams): PetTypeEntity {
    const petFromDb = this._petTypeRepository.findById(id)

    if (!petFromDb) {
      throw new Error("Pet type does not exists");
    }

    const result = this._petTypeRepository.update(id, body)

    return result;
  }
}