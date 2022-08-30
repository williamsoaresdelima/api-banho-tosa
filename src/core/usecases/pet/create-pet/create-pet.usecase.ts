import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { PetEntity } from "@core/entity/pet.entity";
import { CreatePetUseCaseParams, CreatePetInterface } from "./create-pet.interface";

import { PetRepositoryInterface } from "../../../providers/data/pet-repository.interface";

@injectable()
export class CreatePetUseCase implements CreatePetInterface {

  private _petRepository: PetRepositoryInterface;

  constructor(
    @inject(TYPES.PetRepositoryInterface) petRepository: PetRepositoryInterface
  ) {
    this._petRepository = petRepository;
  }

  execute(model: CreatePetUseCaseParams): PetEntity {
    const petFromDb = this._petRepository.search({
      name: model.name
    });

    if (petFromDb.length) {
      throw new Error("Pet already exists");
    }

    const result = this._petRepository.create({
      age: model.age,
      name: model.name,
      petType: model.petType
    });

    return result;
  }
}