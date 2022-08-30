import { PetTypeEntity } from "@core/entity/pet-type.entity";

export interface FindPetTypeByIdInterface {
	execute(id: number): PetTypeEntity;
}