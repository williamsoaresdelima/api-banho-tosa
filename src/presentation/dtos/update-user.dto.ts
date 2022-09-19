import { IsOptional, IsString } from "class-validator";

export namespace UpdateUserDto {

	export class Params {
		@IsString()
		id: string;
	}

	export class Body {
		@IsString()
		@IsOptional()
		name: string;

		@IsString()
		@IsOptional()
		email: string;

		@IsString()
		@IsOptional()
		password: string;
	}
}
