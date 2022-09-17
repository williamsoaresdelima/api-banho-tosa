import { IsNotEmpty, IsString } from "class-validator";

export namespace CreateUserDto {

	export class Body {
		@IsString()
		@IsNotEmpty()
		name: string;

		@IsString()
		@IsNotEmpty()
		email: string;

		@IsString()
		@IsNotEmpty()
		password: string;
	}
}
