import { IsOptional, IsString } from "class-validator";

export namespace UpdateOwnerDto {
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
		cep: string;

		@IsString()
		@IsOptional()
		phone: string;

    @IsString()
		@IsOptional()
		number: string;
	}
}
