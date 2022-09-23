import { IsNotEmpty, IsString } from "class-validator";

export namespace LoginDto {

	export class Body {
		@IsString()
		@IsNotEmpty()
		email: string;

		@IsString()
		@IsNotEmpty()
		password: string;
	}
}
