import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { PetEntity } from "@core/entity/pet.entity";
import { CreatePetUseCaseParams, CreatePetInterface } from "./create-pet.interface";

import { PetRepositoryInterface } from "../../../providers/data/pet-repository.interface";
import { PetTypeRepositoryInterface } from "@core/providers/data/pet-type-repository.interface";
import { IPetDbModel } from "src/infra/data/models/pet.model";

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

  async execute(dto: CreatePetUseCaseParams): Promise<IPetDbModel> {
    const petType = await this._petTypeRepository.findById(dto.petType)

    if (!petType) {
      throw new Error("Pet type does not exists");
    }

    const result = await this._petRepository.create({
      age: dto.age,
      name: dto.name,
      petType: dto.petType
    });

    return result;
  }
}