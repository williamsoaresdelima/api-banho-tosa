import { IsNotEmpty, IsString } from "class-validator";
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

export namespace LoginDto {

	@ApiModel({
    description: "Login",
    name: "Login",
  })
	export class Body {
		@ApiModelProperty({
      description: "email",
      required: true,
      example: ["jonh@gmail.com"],
    })
		@IsString()
		@IsNotEmpty()
		email: string;

		@ApiModelProperty({
      description: "password",
      required: true,
      example: ["12345678"],
    })
		@IsString()
		@IsNotEmpty()
		password: string;
	}
}
