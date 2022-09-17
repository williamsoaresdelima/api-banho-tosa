import { PetTypeEntity } from "@core/entity/pet-type.entity";
import { IPetTypeDbModel } from "src/infra/data/models/pet-type.model";

export type PetTypeRespositorySearchParams = {
	name?: string;
}

export type PetTypeRespositoryCreateParams = {
	name: string;
}

export interface PetTypeRepositoryInterface {
	findById(id: string): Promise<IPetTypeDbModel>;
	create(model: PetTypeRespositoryCreateParams): Promise<IPetTypeDbModel>;
	search(model: PetTypeRespositorySearchParams): Promise<IPetTypeDbModel[]>;
	update(id: string, model: PetTypeRespositoryCreateParams): Promise<void>;
	delete(id: string): Promise<void>;
}
