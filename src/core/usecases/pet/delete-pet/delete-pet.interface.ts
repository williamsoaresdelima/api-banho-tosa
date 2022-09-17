export interface DeletePetInterface {
	execute(id: string): Promise<void>;
}