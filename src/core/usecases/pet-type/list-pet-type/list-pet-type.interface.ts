import { IPetTypeDbModel } from "src/infra/data/models/pet-type.model";

export interface ListPetTypeInterface {
	execute(filter: any): Promise<IPetTypeDbModel[]>;
}
