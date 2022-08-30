import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { PetEntity } from "@core/entity/pet.entity";
import { FindPetByIdInterface } from "./find-pet-by-id.interface";
import { PetRepositoryInterface } from "@core/providers/data/pet-repository.interface";

@injectable()
export class FindPetByIdUseCase implements FindPetByIdInterface {
	private _petRepository: PetRepositoryInterface;

  constructor(
    @inject(TYPES.PetRepositoryInterface) petRepository: PetRepositoryInterface
  ) {
    this._petRepository = petRepository;
  }

	execute(id: number): PetEntity {
		return this._petRepository.findById(id);
	}
}