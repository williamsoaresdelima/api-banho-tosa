import { IsNotEmpty, IsString } from "class-validator";
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

export namespace CreatePetTypeDto {

	@ApiModel({
    description: "Pet Type",
    name: "PetType",
  })
	export class Body {
		@ApiModelProperty({
      description: "name",
      required: true,
      example: ["Cachorro"],
    })
		@IsString()
		@IsNotEmpty()
		name: string;
	}
}
