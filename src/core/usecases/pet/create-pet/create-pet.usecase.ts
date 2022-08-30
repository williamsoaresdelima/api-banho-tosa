import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { PetEntity } from "@core/entity/pet.entity";
import { CreatePetUseCaseParams, CreatePetInterface } from "./create-pet.interface";

import { PetRepositoryInterface } from "../../../providers/data/pet-repository.interface";
import { PetTypeRepositoryInterface } from "@core/providers/data/pet-type-repository.interface";

@injectable()
export class CreatePetUseCase implements CreatePetInterface {

  private _petRepository: PetRepositoryInterface;
  private _petTypeRepository: PetTypeRepositoryInterface;

  constructor(
    @inject(TYPES.PetRepositoryInterface) petRepository: PetRepositoryInterface,
    @inject(TYPES.PetTypeRepositoryInterface) petTypeRepository: PetTypeRepositoryInterface
  ) {
    this._petRepository = petRepository;
    this._petTypeRepository = petTypeRepository;
  }

  execute(model: CreatePetUseCaseParams): PetEntity {
    const petFromDb = this._petRepository.search({
      name: model.name
    });

    if (petFromDb.length) {
      throw new Error("Pet already exists");
    }

    const petType = this._petTypeRepository.findById(model.petType)

    if (!petType) {
      throw new Error("Pet type does not exists");
    }

    const result = this._petRepository.create({
      age: model.age,
      name: model.name,
      petType: petType.id
    });

    return result;
  }
}