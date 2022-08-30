import { IsNotEmpty, IsString } from "class-validator";

export namespace ListPetDto {

	export class Query {
		@IsString()
		@IsNotEmpty()
		name: string
	}
}
