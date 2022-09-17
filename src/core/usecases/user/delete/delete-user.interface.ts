export interface DeleteUserInterface {
	execute(id: string): Promise<void>;
}
