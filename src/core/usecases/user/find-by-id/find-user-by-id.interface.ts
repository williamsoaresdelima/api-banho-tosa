import { IUserDbModel } from "src/infra/data/models/user.model";

export interface FindUserByIdInterface {
	execute(id: string): Promise<IUserDbModel>;
}
