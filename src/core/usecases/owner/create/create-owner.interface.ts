import { IOwnerDbModel } from "src/infra/data/models/owner.model";

export class CreateOwnerUseCaseParams {
	name: string;
	phone: string;
	cep: string;
	number: string;
}

export interface CreateOwnerInterface {
	execute(dto: CreateOwnerUseCaseParams): Promise<IOwnerDbModel>;
}