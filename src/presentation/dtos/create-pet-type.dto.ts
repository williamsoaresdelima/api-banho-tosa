import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export namespace CreatePetTypeDto {

	export class Body {
		@IsString()
		@IsNotEmpty()
		name: string;
	}
}
