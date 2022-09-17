import { IPetTypeDbModel } from "src/infra/data/models/pet-type.model";

export class CreatePetTypeUseCaseParams {
	name: string;
}

export interface CreatePetTypeInterface {
	execute(model: CreatePetTypeUseCaseParams): Promise<IPetTypeDbModel>;
}