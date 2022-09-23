export interface DeleteOwnerInterface {
	execute(id: string): Promise<void>;
}