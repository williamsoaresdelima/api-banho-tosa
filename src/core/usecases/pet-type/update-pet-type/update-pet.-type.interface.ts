export class UpdatePetTypeUseCaseParams {
	name: string;
}

export interface UpdatePetTypeInterface {
	execute(id: string, body: UpdatePetTypeUseCaseParams): Promise<void>;
}