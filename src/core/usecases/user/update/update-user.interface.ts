import { IUserDbModel } from "src/infra/data/models/user.model";

export class UpdateUserUseCaseParams {
	email: string;
	name: string;
	password: string;
}

export interface UpdateUserInterface {
	execute(id: string, dto: UpdateUserUseCaseParams): Promise<void>;
}
