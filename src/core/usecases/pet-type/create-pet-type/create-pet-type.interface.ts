import { PetTypeEntity } from "@core/entity/pet-type.entity";

export class CreatePetTypeUseCaseParams {
	name: string;
}

export interface CreatePetTypeInterface {
	execute(model: CreatePetTypeUseCaseParams): PetTypeEntity;
}