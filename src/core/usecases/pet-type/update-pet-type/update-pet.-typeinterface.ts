import { PetTypeEntity } from "@core/entity/pet-type.entity";

export class UpdatePetTypeUseCaseParams {
	name: string;
}

export interface UpdatePetTypeInterface {
	execute(id: number, body: UpdatePetTypeUseCaseParams): PetTypeEntity;
}