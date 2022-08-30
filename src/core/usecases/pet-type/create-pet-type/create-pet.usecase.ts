import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { PetTypeEntity } from "@core/entity/pet-type.entity";
import { PetTypeRepositoryInterface } from "@core/providers/data/pet-type-repository.interface";
import { CreatePetTypeInterface, CreatePetTypeUseCaseParams } from "./create-pet-type.interface";

@injectable()
export class CreatePetTypeUseCase implements CreatePetTypeInterface {

  private _petTypeRepository: PetTypeRepositoryInterface;

  constructor(
    @inject(TYPES.PetTypeRepositoryInterface) petTypeRepository: PetTypeRepositoryInterface
  ) {
    this._petTypeRepository = petTypeRepository;
  }

  execute(model: CreatePetTypeUseCaseParams): PetTypeEntity {
    const petFromDb = this._petTypeRepository.search({
      name: model.name
    });

    if (petFromDb.length) {
      throw new Error("Pet type already exists");
    }

    const result = this._petTypeRepository.create({
      name: model.name,
    });

    return result;
  }
}