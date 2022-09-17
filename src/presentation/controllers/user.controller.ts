import { inject } from "inversify";
import { BaseHttpController, interfaces, controller, httpPost, requestBody } from "inversify-express-utils";

import TYPES from "../../types";

import { CreateUserDto } from "../dtos/create-user.dto";

import { ListUserInterface } from "@core/usecases/user/list/list-user.interface";
import { CreateUserInterface } from "@core/usecases/user/create/create-user.interface";
import { UpdateUserInterface } from "@core/usecases/user/update/update-user.interface";
import { DeleteUserInterface } from "@core/usecases/user/delete/delete-user.interface";
import { FindUserByIdInterface } from "@core/usecases/user/find-by-id/find-user-by-id.interface";

@controller('/user')
export class UserController extends BaseHttpController implements interfaces.Controller {
	
	// private _listUserService: ListUserInterface;
	private _createUserService: CreateUserInterface;
	// private _findUserByIdService: FindUserByIdInterface;
	// private _updateUserService: UpdateUserInterface;
	// private _deleteUserService: DeleteUserInterface;

	constructor(
		// @inject(TYPES.ListUserInterface) listUserUseCase: ListUserInterface,
		@inject(TYPES.CreateUserInterface) createUserUseCase: CreateUserInterface,
		// @inject(TYPES.FindUserByIdInterface) findUserByIdUseCase: FindUserByIdInterface,
		// @inject(TYPES.UpdateUserInterface) updateUserUseCase: UpdateUserInterface,
		// @inject(TYPES.DeleteUserInterface) deleteUserUseCase: DeleteUserInterface,
	) {
		super();
		// this._listUserService = listUserUseCase;
		this._createUserService = createUserUseCase;
		// this._findUserByIdService = findUserByIdUseCase;
		// this._updateUserService = updateUserUseCase;
		// this._deleteUserService = deleteUserUseCase;
	}
	@httpPost("/")
	public async create(@requestBody() body: CreateUserDto.Body): Promise<interfaces.IHttpActionResult> {
		const user = await this._createUserService.execute(body)

		return this.json(user);
	}
}
