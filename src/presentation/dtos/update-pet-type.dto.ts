import { IsNumber, IsOptional, IsString } from "class-validator";

export namespace UpdatePetTypeDto {

	export class Params {
		@IsString()
		id: string;
	}

	export class Body {
		@IsString()
		@IsOptional()
		name: string;
	}
}
