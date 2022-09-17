import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { PetTypeEntity } from "@core/entity/pet-type.entity";
import { PetTypeRepositoryInterface } from "@core/providers/data/pet-type-repository.interface";
import { UpdatePetTypeInterface, UpdatePetTypeUseCaseParams } from "./update-pet.-type.interface";

@injectable()
export class UpdatePetTypeUseCase implements UpdatePetTypeInterface {

  private _petTypeRepository: PetTypeRepositoryInterface;

  constructor(
    @inject(TYPES.PetTypeRepositoryInterface) petTypeRepository: PetTypeRepositoryInterface
  ) {
    this._petTypeRepository = petTypeRepository;
  }

  async execute(id: string, body: UpdatePetTypeUseCaseParams): Promise<void> {
    const petType = this._petTypeRepository.findById(id);

    if (!petType) {
      throw new Error("Pet type does not exists");
    }

    await this._petTypeRepository.update(id, body);
  }
}