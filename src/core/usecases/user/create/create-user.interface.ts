import { IUserDbModel } from "src/infra/data/models/user.model";

export class CreateUserUseCaseParams {
	name: string;
	email: string;
	password: string;
}

export interface CreateUserInterface {
	execute(model: CreateUserUseCaseParams): Promise<IUserDbModel>;
}