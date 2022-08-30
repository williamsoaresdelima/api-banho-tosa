import { PetTypeEntity } from "@core/entity/pet-type.entity";

export type PetTypeRespositorySearchParams = {
	name?: string;
}

export type PetTypeRespositoryCreateParams = {
	name: string;
}

export interface PetTypeRepositoryInterface {
	findById(id: number): PetTypeEntity;
	create(model: PetTypeRespositoryCreateParams): PetTypeEntity;
	search(model: PetTypeRespositorySearchParams): PetTypeEntity[];
	update(id: number, model: PetTypeRespositoryCreateParams): PetTypeEntity;
	delete(id: number): void;
}