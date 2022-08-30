import { PetTypeEntity } from "@core/entity/pet-type.entity";
import { PetEntity } from "@core/entity/pet.entity";

export type PetRespositorySearchParams = {
	name?: string;
}

export type PetRespositoryCreateParams = {
	name: string;
	age: number;
	petType: number;
}

export interface PetRepositoryInterface {
	findById(id: number): PetEntity;
	create(model: PetRespositoryCreateParams): PetEntity;
	search(model: PetRespositorySearchParams): PetEntity[];
	update(id: number, model: PetRespositoryCreateParams): PetEntity;
	delete(id: number): void;
}