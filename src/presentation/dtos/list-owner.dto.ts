import { IsNotEmpty, IsString } from "class-validator";

export namespace ListOwnerDto {

	export class Query {
		@IsString()
		@IsNotEmpty()
		name: string
	}
}
