import { IPetDbModel } from "src/infra/data/models/pet.model";

export interface ListPetInterface {
	execute(filter: any): Promise<IPetDbModel[]>;
}
