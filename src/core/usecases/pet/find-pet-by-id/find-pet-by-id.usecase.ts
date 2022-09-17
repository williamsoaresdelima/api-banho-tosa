import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";

import { IPetDbModel } from "src/infra/data/models/pet.model";
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

	async execute(id: string): Promise<IPetDbModel> {
		return this._petRepository.findById(id);
	}
}