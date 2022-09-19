export interface DeletePetTypeInterface {
	execute(id: string): Promise<void>;
}