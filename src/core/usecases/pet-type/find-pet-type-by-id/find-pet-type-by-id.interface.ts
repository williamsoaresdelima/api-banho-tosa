import { IPetTypeDbModel } from "src/infra/data/models/pet-type.model";

export interface FindPetTypeByIdInterface {
	execute(id: string): Promise<IPetTypeDbModel>;
}