import { PetEntity } from "@core/entity/pet.entity";

export interface FindPetByIdInterface {
	execute(id: number): PetEntity;
}