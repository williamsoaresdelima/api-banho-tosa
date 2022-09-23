import { inject } from "inversify";
import { BaseHttpController, interfaces, controller, httpPost, requestBody, httpGet, queryParam, requestParam, httpDelete, httpPut } from "inversify-express-utils";

import TYPES from "../../types";

// import { ListUserDto } from "../dtos/list-user.dto";
// import { UpdateUserDto } from "../dtos/update-user.dto";
import { CreateOwnerDto } from "../dtos/create-owner.dto";
import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";
// import { ListUserInterface } from "@core/usecases/user/list/list-user.interface";
// import { CreateUserInterface } from "@core/usecases/user/create/create-user.interface";
import { CreateOwnerInterface } from "@core/usecases/owner/create/create-owner.interface";
// import { UpdateUserInterface } from "@core/usecases/user/update/update-user.interface";
// import { DeleteUserInterface } from "@core/usecases/user/delete/delete-user.interface";
// import { FindUserByIdInterface } from "@core/usecases/user/find-by-id/find-user-by-id.interface";

@controller('/owner')
export class OwnerController extends BaseHttpController implements interfaces.Controller {
	
	private _createOwnerService: CreateOwnerInterface;
	// private _listUserService: ListUserInterface;
	// private _findUserByIdService: FindUserByIdInterface;
	// private _updateUserService: UpdateUserInterface;
	// private _deleteUserService: DeleteUserInterface;

	constructor(
		// @inject(TYPES.ListUserInterface) listUserUseCase: ListUserInterface,
		@inject(TYPES.CreateOwnerInterface) createOwnerUseCase: CreateOwnerInterface,
		// @inject(TYPES.FindUserByIdInterface) findUserByIdUseCase: FindUserByIdInterface,
		// @inject(TYPES.UpdateUserInterface) updateUserUseCase: UpdateUserInterface,
		// @inject(TYPES.DeleteUserInterface) deleteUserUseCase: DeleteUserInterface,
	) {
		super();
		// this._listUserService = listUserUseCase;
		this._createOwnerService = createOwnerUseCase;
		// this._findUserByIdService = findUserByIdUseCase;
		// this._updateUserService = updateUserUseCase;
		// this._deleteUserService = deleteUserUseCase;
	}

	// @httpGet("/")
	// public async findAll(@queryParam() query: ListUserDto.Query): Promise<interfaces.IHttpActionResult> {
	// 	const users = await this._listUserService.execute(query)

	// 	return this.json(users);
	// }

	// @httpGet("/:id")
	// public async findById(@requestParam('id') id: string): Promise<interfaces.IHttpActionResult> {
	// 	const user = await this._findUserByIdService.execute(id)

	// 	return this.json(user);
	// }

	@httpPost("/")
	public async create(@requestBody() body: CreateOwnerDto.Body): Promise<interfaces.IHttpActionResult> {
		const user = await this._createOwnerService.execute(body)

		return this.json(user);
	}

	// @httpPut(
	// 	"/:id",
	// 	ValidateDtoMiddleware(UpdateUserDto.Params, "params"),
	// 	ValidateDtoMiddleware(UpdateUserDto.Body, "body"),
	// )
	// public async update(
	// 	@requestParam('id') id: string,
	// 	@requestBody() body: UpdateUserDto.Body,
	// ): Promise<interfaces.IHttpActionResult> {
	// 	const response = await this._updateUserService.execute(id, body as any)

	// 	return this.json(response)
	// }

	// @httpDelete(
	// 	"/:id"
	// )
	// public async delete(
	// 	@requestParam('id') id: string,
	// ): Promise<interfaces.IHttpActionResult> {
	// 	await this._deleteUserService.execute(id);

	// 	return this.json({})
	// }
}
