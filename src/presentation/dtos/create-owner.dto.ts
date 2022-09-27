import { IsNotEmpty, IsString } from "class-validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

export namespace CreateOwnerDto {
  @ApiModel({
    description: "Owner",
    name: "Owner",
  })
  export class Body {
    @ApiModelProperty({
      description: "name",
      required: true,
      example: ["Jonh"],
    })
    @IsString()
    @IsNotEmpty()
    name: string;

		@ApiModelProperty({
      description: "cep",
      required: true,
      example: ["94890237"],
    })
    @IsString()
    @IsNotEmpty()
    cep: string;

		@ApiModelProperty({
      description: "phone",
      required: true,
      example: ["11 99999 9999"],
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

		@ApiModelProperty({
      description: "number",
      required: true,
      example: ["10"],
    })
    @IsString()
    @IsNotEmpty()
    number: string;
  }
}
