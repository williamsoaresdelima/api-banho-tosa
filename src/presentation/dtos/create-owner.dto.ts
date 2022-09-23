import { IsNotEmpty, IsString } from "class-validator";

export namespace CreateOwnerDto {

	export class Body {
		@IsString()
		@IsNotEmpty()
		name: string;

		@IsString()
		@IsNotEmpty()
		cep: string;

		@IsString()
		@IsNotEmpty()
		phone: string;

    @IsString()
		@IsNotEmpty()
		number: string;
	}
}
