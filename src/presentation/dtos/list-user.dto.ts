import { IsNotEmpty, IsString } from "class-validator";

export namespace ListUserDto {

	export class Query {
		@IsString()
		@IsNotEmpty()
		name: string
	}
}
