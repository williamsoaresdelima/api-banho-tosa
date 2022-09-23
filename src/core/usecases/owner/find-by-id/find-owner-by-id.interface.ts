import { IOwnerDbModel } from "../../../../infra/data/models/owner.model";

export interface FindOwnerByIdInterface {
	execute(id: string): Promise<IOwnerDbModel>;
}
