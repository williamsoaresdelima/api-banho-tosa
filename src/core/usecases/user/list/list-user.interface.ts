import { IUserDbModel } from "src/infra/data/models/user.model";

export interface ListUserInterface {
	execute(filter: any): Promise<IUserDbModel[]>;
}
