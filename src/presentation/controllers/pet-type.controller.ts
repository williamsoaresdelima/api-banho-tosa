import * as express from "express";
import { inject } from "inversify";
import { 
	httpGet, 
	httpPut,
	httpPost,
	controller, 
	interfaces,
	httpDelete,
	queryParam, 
	requestBody, 
	requestParam, 
	BaseHttpController,
} from "inversify-express-utils";

import TYPES from "../../types";
import { ListPetTypeDto } from "../dtos/list-pet-type.dto";
import { CreatePetTypeDto } from "../dtos/create-pet-type.dto";
import { UpdatePetTypeDto } from "../dtos/update-pet-type.dto";
import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";
import { ListPetTypeInterface } from "@core/usecases/pet-type/list-pet-type/list-pet-type.interface";
import { CreatePetTypeInterface } from "@core/usecases/pet-type/create-pet-type/create-pet-type.interface";
import { UpdatePetTypeInterface } from "@core/usecases/pet-type/update-pet-type/update-pet.-typeinterface";
import { DeletePetTypeInterface } from "@core/usecases/pet-type/delete-pet-type/delete-pet-type.interface";
import { FindPetTypeByIdInterface } from "@core/usecases/pet-type/find-pet-type-by-id/find-pet-type-by-id.interface";


@controller('/pet-type')
export class PetTypeController extends BaseHttpController implements interfaces.Controller {

	private _listPetTypeService: ListPetTypeInterface;
	private _createPetTypeService: CreatePetTypeInterface;
	private _findPetTypeByIdService: FindPetTypeByIdInterface;
	private _updatePetTypeService: UpdatePetTypeInterface;
	private _deletePetTypeService: DeletePetTypeInterface;

	constructor(
		@inject(TYPES.ListPetTypeInterface) listPetTypeUseCase: ListPetTypeInterface,
		@inject(TYPES.CreatePetTypeInterface) createPetTypeUseCase: CreatePetTypeInterface,
		@inject(TYPES.FindPetTypeByIdInterface) findPetTypeByIdUseCase: FindPetTypeByIdInterface,
		@inject(TYPES.UpdatePetTypeInterface) updatePetTypeUseCase: UpdatePetTypeInterface,
		@inject(TYPES.DeletePetTypeInterface) deletePetTypeUseCase: DeletePetTypeInterface,
	) {
		super();
		this._listPetTypeService = listPetTypeUseCase;
		this._createPetTypeService = createPetTypeUseCase;
		this._findPetTypeByIdService = findPetTypeByIdUseCase;
		this._updatePetTypeService = updatePetTypeUseCase;
		this._deletePetTypeService = deletePetTypeUseCase;
	}

	@httpGet("/")
	public async find(
		@queryParam() query: ListPetTypeDto.Query,
	): Promise<interfaces.IHttpActionResult> {
		const response: any[] = await this._listPetTypeService.execute(query);

		return this.json(response);
	}

	@httpGet("/:id")
	public async findById(
		@requestParam('id') id: string,
	): Promise<interfaces.IHttpActionResult> {
		try {
			const pet = await this._findPetTypeByIdService.execute(id);
			
			return this.json(pet);
		} catch (error) {
			if (error.name == 'BusinessError') {
				return this.badRequest(error.message);
			}

			return this.internalServerError(error.message);
		}
	}

	@httpPost(
		"/",
		ValidateDtoMiddleware(CreatePetTypeDto.Body, "body"),
	)
	public async create(
		@requestBody() body: CreatePetTypeDto.Body,
	): Promise<interfaces.IHttpActionResult> {
		const result = this._createPetTypeService.execute({
			name: body.name,
		});

		return this.json(result);
	}

	@httpPut(
		"/:id",
		ValidateDtoMiddleware(UpdatePetTypeDto.Params, "params"),
		ValidateDtoMiddleware(UpdatePetTypeDto.Body, "body"),
	)
	public async update(
		@requestParam('id') id: string,
		@requestBody() body: UpdatePetTypeDto.Body,
	): Promise<interfaces.IHttpActionResult> {
		const response = this._updatePetTypeService.execute(id, body)

		return this.json(response)
	}

	@httpDelete(
		"/:id",
		ValidateDtoMiddleware(UpdatePetTypeDto.Params, "params"),
	)
	public async delete(
		@requestParam('id') id: string,
	): Promise<interfaces.IHttpActionResult> {
		this._deletePetTypeService.execute(id)

		return this.json({})
	}
}
