import { IOwnerDbModel } from "src/infra/data/models/owner.model";

export interface ListOwnerInterface {
	execute(filter: any): Promise<IOwnerDbModel[]>;
}
