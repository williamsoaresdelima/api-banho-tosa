import { inject } from "inversify";
import { BaseHttpController, interfaces, controller, httpPost, requestBody } from "inversify-express-utils";
import TYPES from "../../types";

import { LoginDto } from "../../presentation/dtos/login.dto";
import { LoginInterface } from "../../core/usecases/auth/login/login.interface";


@controller('/auth')
export class AuthController extends BaseHttpController implements interfaces.Controller {
	private _loginService: LoginInterface;

	constructor(@inject(TYPES.LoginInterface) loginService: LoginInterface) {
		super();
		this._loginService = loginService;
	}

	@httpPost("/login")
	public async login(@requestBody() body: LoginDto.Body): Promise<interfaces.IHttpActionResult> {
		const user = await this._loginService.execute(body)

		return this.json(user);
	}
}
