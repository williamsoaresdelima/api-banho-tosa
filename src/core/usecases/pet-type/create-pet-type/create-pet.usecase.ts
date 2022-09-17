import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { PetTypeEntity } from "@core/entity/pet-type.entity";
import { PetTypeRepositoryInterface } from "@core/providers/data/pet-type-repository.interface";
import { CreatePetTypeInterface, CreatePetTypeUseCaseParams } from "./create-pet-type.interface";
import { IPetTypeDbModel } from "src/infra/data/models/pet-type.model";

@injectable()
export class CreatePetTypeUseCase implements CreatePetTypeInterface {

  private _petTypeRepository: PetTypeRepositoryInterface;

  constructor(
    @inject(TYPES.PetTypeRepositoryInterface) petTypeRepository: PetTypeRepositoryInterface
  ) {
    this._petTypeRepository = petTypeRepository;
  }

  async execute(dto: CreatePetTypeUseCaseParams): Promise<IPetTypeDbModel> {
    const petType = await this._petTypeRepository.create({
      name: dto.name,
    })

    return petType
  }
}