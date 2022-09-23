import { IUserDbModel } from "src/infra/data/models/user.model";

export type UserRespositorySearchParams = {
	email?: string;
  name?: string;
}

export type UserRespositoryCreateParams = {
	email: string;
  name: string;
  password: string;
}

export interface UserRepositoryInterface {
	findById(id: string): Promise<IUserDbModel>;
	findByEmail(email: string): Promise<IUserDbModel | null>;
	create(model: UserRespositoryCreateParams): Promise<IUserDbModel>;
	search(model: UserRespositorySearchParams): Promise<IUserDbModel[]>;
	update(id: string, model: UserRespositoryCreateParams): Promise<void>;
	delete(id: string): Promise<void>;
}
