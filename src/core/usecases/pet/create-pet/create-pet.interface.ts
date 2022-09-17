import { IPetDbModel } from "src/infra/data/models/pet.model";

export class CreatePetUseCaseParams {
	name: string;
	age: number;
	petType: string;
}

export interface CreatePetInterface {
	execute(model: CreatePetUseCaseParams): Promise<IPetDbModel>;
}