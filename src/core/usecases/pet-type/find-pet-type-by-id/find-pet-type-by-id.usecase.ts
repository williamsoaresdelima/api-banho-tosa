import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { FindPetTypeByIdInterface } from "./find-pet-type-by-id.interface";
import { PetTypeRepositoryInterface } from "@core/providers/data/pet-type-repository.interface";
import { IPetTypeDbModel } from "src/infra/data/models/pet-type.model";

@injectable()
export class FindPetTypeByIdUseCase implements FindPetTypeByIdInterface {
	private _petTypeRepository: PetTypeRepositoryInterface;

  constructor(
    @inject(TYPES.PetTypeRepositoryInterface) petTypeRepository: PetTypeRepositoryInterface
  ) {
    this._petTypeRepository = petTypeRepository;
  }

	async execute(id: string): Promise<IPetTypeDbModel> {
		return this._petTypeRepository.findById(id);
	}
}