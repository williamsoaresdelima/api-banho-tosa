import { IPetDbModel } from "src/infra/data/models/pet.model";

export interface FindPetByIdInterface {
	execute(id: string): Promise<IPetDbModel>;
}
