import { PetEntity } from "@core/entity/pet.entity";

export class CreatePetUseCaseParams {
	name: string;
	age: number;
	petType: number;
}

export interface CreatePetInterface {
	execute(model: CreatePetUseCaseParams): PetEntity;
}