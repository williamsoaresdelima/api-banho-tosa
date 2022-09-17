import { IPetDbModel } from "src/infra/data/models/pet.model";

export type PetRespositorySearchParams = {
	name?: string;
}

export type PetRespositoryCreateParams = {
	name: string;
	age: number;
	petType: string;
}

export interface PetRepositoryInterface {
	findById(id: string): Promise<IPetDbModel>;
	create(model: PetRespositoryCreateParams): Promise<IPetDbModel>;
	search(model: PetRespositorySearchParams): Promise<IPetDbModel[]>;
	update(id: string, model: PetRespositoryCreateParams): Promise<void>;
	delete(id: string): Promise<void>;
}
