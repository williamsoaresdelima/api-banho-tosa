export class UpdatePetUseCaseParams {
	name: string;
	age: number;
	petType: string;
}

export interface UpdatePetInterface {
	execute(id: string, body: UpdatePetUseCaseParams): Promise<void>;
}
