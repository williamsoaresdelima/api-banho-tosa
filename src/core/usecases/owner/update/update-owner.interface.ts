export class UpdateOwnerUseCaseParams {
	name: string;
	phone: string;
	cep: string;
	number: string;
}

export interface UpdateOwnerInterface {
	execute(id: string, body: UpdateOwnerUseCaseParams): Promise<void>;
}
