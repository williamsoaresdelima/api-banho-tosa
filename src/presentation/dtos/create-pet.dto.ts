import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export namespace CreatePetDto {

	export class Body {
		@IsString()
		@IsNotEmpty()
		name: string;

		@IsNumber()
		@IsNotEmpty()
		age: number;

		@IsNumber()
		@IsNotEmpty()
		petType: number;
	}
}
