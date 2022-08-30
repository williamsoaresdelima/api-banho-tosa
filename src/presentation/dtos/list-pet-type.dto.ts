import { IsNotEmpty, IsString } from "class-validator";

export namespace ListPetTypeDto {

	export class Query {
		@IsString()
		@IsNotEmpty()
		name: string
	}
}
