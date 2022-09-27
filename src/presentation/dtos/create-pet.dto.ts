import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

export namespace CreatePetDto {

	@ApiModel({
    description: "Pet",
    name: "Pet",
  })
	export class Body {
		@ApiModelProperty({
      description: "name",
      required: true,
      example: ["Ralph"],
    })
		@IsString()
		@IsNotEmpty()
		name: string;

		@ApiModelProperty({
      description: "age",
      required: true,
      example: ["5"],
    })
		@IsNumber()
		@IsNotEmpty()
		age: number;

		@ApiModelProperty({
      description: "petType",
      required: true,
      example: ["4809237534759347"],
    })
		@IsString()
		@IsNotEmpty()
		petType: string;
	}
}
