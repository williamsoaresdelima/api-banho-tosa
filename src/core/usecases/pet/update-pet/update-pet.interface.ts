import { PetEntity } from "@core/entity/pet.entity";

export class UpdatePetUseCaseParams {
	name: string;
	age: number;
	petType: number;
}

export interface UpdatePetInterface {
	execute(id: number, body: UpdatePetUseCaseParams): PetEntity;
}