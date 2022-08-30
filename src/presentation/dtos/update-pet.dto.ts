import { IsNumber, IsOptional, IsString } from "class-validator";

export namespace UpdatePetDto {

	export class Params {
		@IsString()
		id: string;
	}

	export class Body {
		@IsString()
		@IsOptional()
		name: string;

		@IsNumber()
		@IsOptional()
		age: number;

		@IsNumber()
		@IsOptional()
		petType: number;
	}
}
