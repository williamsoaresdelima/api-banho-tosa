import { inject } from "inversify";
import {
	httpPost,
  controller,
	interfaces,
  requestBody,
  BaseHttpController,
} from "inversify-express-utils";
import { ApiOperationPost, ApiPath } from 'swagger-express-ts';

import TYPES from "../../types";

import { LoginDto } from "../../presentation/dtos/login.dto";
import { LoginInterface } from "../../core/usecases/auth/login/login.interface";

@ApiPath({
  path: "/auth",
  name: "Auth",
  security: { basicAuth: [] },
})
@controller("/auth")
export class AuthController
  extends BaseHttpController
  implements interfaces.Controller
{
  private _loginService: LoginInterface;

  constructor(@inject(TYPES.LoginInterface) loginService: LoginInterface) {
    super();
    this._loginService = loginService;
  }

  @ApiOperationPost({
    description: "Login",
    summary: "Login",
    path: "/login",
    parameters: {
      body: { description: "Login", required: true, model: "Login" },
    },
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" },
    },
  })
  @httpPost("/login")
  public async login(
    @requestBody() body: LoginDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    const user = await this._loginService.execute(body);

    return this.json(user);
  }
}
