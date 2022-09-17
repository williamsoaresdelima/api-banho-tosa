import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";
import { ListPetInterface } from "./list-pet.interface";
import { IPetDbModel } from "src/infra/data/models/pet.model";
import { PetRepositoryInterface } from "@core/providers/data/pet-repository.interface";

@injectable()
export class ListPetUseCase implements ListPetInterface {
	private _petRepository: PetRepositoryInterface;

  constructor(
    @inject(TYPES.PetRepositoryInterface) petRepository: PetRepositoryInterface
  ) {
    this._petRepository = petRepository;
  }

	execute(filter: any): Promise<IPetDbModel[]> {
		return this._petRepository.search(filter);
	}
}