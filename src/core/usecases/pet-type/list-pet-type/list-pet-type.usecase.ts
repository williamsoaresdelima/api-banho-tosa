import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { ListPetTypeInterface } from "./list-pet-type.interface";
import { PetTypeRepositoryInterface } from "@core/providers/data/pet-type-repository.interface";
import { IPetTypeDbModel } from "src/infra/data/models/pet-type.model";

@injectable()
export class ListPetTypeUseCase implements ListPetTypeInterface {
	private _petTypeRepository: PetTypeRepositoryInterface;

  constructor(
    @inject(TYPES.PetTypeRepositoryInterface) petTypeRepository: PetTypeRepositoryInterface
  ) {
    this._petTypeRepository = petTypeRepository;
  }

	async execute(filter: any): Promise<IPetTypeDbModel[]> {
		return this._petTypeRepository.search(filter);
	}
}