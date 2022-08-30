import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { PetTypeEntity } from "@core/entity/pet-type.entity";
import { FindPetTypeByIdInterface } from "./find-pet-type-by-id.interface";
import { PetTypeRepositoryInterface } from "@core/providers/data/pet-type-repository.interface";

@injectable()
export class FindPetTypeByIdUseCase implements FindPetTypeByIdInterface {
	private _petTypeRepository: PetTypeRepositoryInterface;

  constructor(
    @inject(TYPES.PetTypeRepositoryInterface) petTypeRepository: PetTypeRepositoryInterface
  ) {
    this._petTypeRepository = petTypeRepository;
  }

	execute(id: number): PetTypeEntity {
		return this._petTypeRepository.findById(id);
	}
}