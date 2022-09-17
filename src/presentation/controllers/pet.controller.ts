import * as express from "express";
import { inject } from "inversify";
import { 
	httpGet, 
	httpPut,
	httpPost,
	interfaces,
	controller, 
	queryParam, 
	httpDelete, 
	requestBody,
	requestParam,
	BaseHttpController,
} from "inversify-express-utils";

import TYPES from "../../types";
import { ListPetDto } from "../dtos/list-pet.dto";
import { CreatePetDto } from "../dtos/create-pet.dto";
import { UpdatePetDto } from "../dtos/update-pet.dto";
import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";
import { ListPetInterface } from "../../core/usecases/pet/list-pet/list-pet.interface";
import { UpdatePetInterface } from "@core/usecases/pet/update-pet/update-pet.interface";
import { DeletePetInterface } from "@core/usecases/pet/delete-pet/delete-pet.interface";
import { CreatePetInterface } from "../../core/usecases/pet/create-pet/create-pet.interface";
import { FindPetByIdInterface } from "@core/usecases/pet/find-pet-by-id/find-pet-by-id.interface";


@controller('/pet')
export class PetController extends BaseHttpController implements interfaces.Controller {

	private _listPetService: ListPetInterface;
	private _createPetService: CreatePetInterface;
	private _findByIdService: FindPetByIdInterface;
	private _updatePetService: UpdatePetInterface;
	private _deletePetService: DeletePetInterface;

	constructor(
		@inject(TYPES.ListPetInterface) listPetUseCase: ListPetInterface,
		@inject(TYPES.CreatePetInterface) createPetUseCase: CreatePetInterface,
		@inject(TYPES.FindPetByIdInterface) findByIdUseCase: FindPetByIdInterface,
		@inject(TYPES.UpdatePetInterface) updatePetUseCase: UpdatePetInterface,
		@inject(TYPES.DeletePetInterface) deletePetUseCase: DeletePetInterface,
	) {
		super();
		this._listPetService = listPetUseCase;
		this._createPetService = createPetUseCase;
		this._findByIdService = findByIdUseCase;
		this._updatePetService = updatePetUseCase;
		this._deletePetService = deletePetUseCase;
	}

	@httpGet("/")
	public async find(
		@queryParam() query: ListPetDto.Query,
	): Promise<interfaces.IHttpActionResult> {
		const response: any[] = await this._listPetService.execute(query);

		return this.json(response);
	}

	@httpGet("/:id")
	public async findById(
		@requestParam('id') id: string,
	): Promise<interfaces.IHttpActionResult> {
		try {
			const pet = await this._findByIdService.execute(id);
			
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
		ValidateDtoMiddleware(CreatePetDto.Body, "body"),
	)
	public async create(
		@requestBody() body: CreatePetDto.Body,
	): Promise<interfaces.IHttpActionResult> {
		const result = this._createPetService.execute({
			name: body.name,
			age: body.age,
			petType: body.petType
		});

		return this.json(result);
	}

	@httpPut(
		"/:id",
		ValidateDtoMiddleware(UpdatePetDto.Params, "params"),
		ValidateDtoMiddleware(UpdatePetDto.Body, "body"),
	)
	public async update(
		@requestParam('id') id: string,
		@requestBody() body: UpdatePetDto.Body,
	): Promise<interfaces.IHttpActionResult> {
		const response = this._updatePetService.execute(id, body as any)

		return this.json(response)
	}

	@httpDelete(
		"/:id",
		ValidateDtoMiddleware(UpdatePetDto.Params, "params"),
	)
	public async delete(
		@requestParam('id') id: string,
	): Promise<interfaces.IHttpActionResult> {
		this._deletePetService.execute(id)

		return this.json({})
	}
}
