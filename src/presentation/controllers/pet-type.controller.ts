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
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPut,
  ApiOperationPost,
  ApiOperationDelete,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

import TYPES from "../../types";

import { ListPetTypeDto } from "../dtos/list-pet-type.dto";
import { CreatePetTypeDto } from "../dtos/create-pet-type.dto";
import { UpdatePetTypeDto } from "../dtos/update-pet-type.dto";
import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";
import { ValidateTokenMiddleware } from "../../presentation/middlewares/validate-token.middleware";
import { ListPetTypeInterface } from "@core/usecases/pet-type/list-pet-type/list-pet-type.interface";
import { CreatePetTypeInterface } from "@core/usecases/pet-type/create-pet-type/create-pet-type.interface";
import { UpdatePetTypeInterface } from "@core/usecases/pet-type/update-pet-type/update-pet.-type.interface";
import { DeletePetTypeInterface } from "@core/usecases/pet-type/delete-pet-type/delete-pet-type.interface";
import { FindPetTypeByIdInterface } from "@core/usecases/pet-type/find-pet-type-by-id/find-pet-type-by-id.interface";

@ApiPath({
  path: "/pet-type",
  name: "Pet Type",
  security: { basicAuth: [] },
})
@controller("/pet-type", ValidateTokenMiddleware)
export class PetTypeController
  extends BaseHttpController
  implements interfaces.Controller
{
  private _listPetTypeService: ListPetTypeInterface;
  private _createPetTypeService: CreatePetTypeInterface;
  private _findPetTypeByIdService: FindPetTypeByIdInterface;
  private _updatePetTypeService: UpdatePetTypeInterface;
  private _deletePetTypeService: DeletePetTypeInterface;

  constructor(
    @inject(TYPES.ListPetTypeInterface)
    listPetTypeUseCase: ListPetTypeInterface,
    @inject(TYPES.CreatePetTypeInterface)
    createPetTypeUseCase: CreatePetTypeInterface,
    @inject(TYPES.FindPetTypeByIdInterface)
    findPetTypeByIdUseCase: FindPetTypeByIdInterface,
    @inject(TYPES.UpdatePetTypeInterface)
    updatePetTypeUseCase: UpdatePetTypeInterface,
    @inject(TYPES.DeletePetTypeInterface)
    deletePetTypeUseCase: DeletePetTypeInterface
  ) {
    super();
    this._listPetTypeService = listPetTypeUseCase;
    this._createPetTypeService = createPetTypeUseCase;
    this._findPetTypeByIdService = findPetTypeByIdUseCase;
    this._updatePetTypeService = updatePetTypeUseCase;
    this._deletePetTypeService = deletePetTypeUseCase;
  }

  @ApiOperationGet({
    description: "Get pet types objects list",
    summary: "Get pet types list",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: "PetType",
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet("/")
  public async find(
    @queryParam() query: ListPetTypeDto.Query
  ): Promise<interfaces.IHttpActionResult> {
    const response: any[] = await this._listPetTypeService.execute(query);

    return this.json(response);
  }

  @ApiOperationGet({
    path: "/:id",
    description: "Get pet type objects",
    summary: "Get pet type",
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          type: "number",
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: "PetType",
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet("/:id")
  public async findById(
    @requestParam("id") id: string
  ): Promise<interfaces.IHttpActionResult> {
    try {
      const pet = await this._findPetTypeByIdService.execute(id);

      return this.json(pet);
    } catch (error) {
      if (error.name == "BusinessError") {
        return this.badRequest(error.message);
      }

      return this.internalServerError(error.message);
    }
  }

  @ApiOperationPost({
    description: "Create a pet type",
    summary: "Create pet type",
    parameters: {
      body: { description: "New pet type", required: true, model: "PetType" },
    },
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" },
    },
  })
  @httpPost("/", ValidateDtoMiddleware(CreatePetTypeDto.Body, "body"))
  public async create(
    @requestBody() body: CreatePetTypeDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    const result = this._createPetTypeService.execute({
      name: body.name,
    });

    return this.json(result);
  }

  @ApiOperationPut({
    path: "/:id",
    description: "Update pet type",
    summary: "Update pet type",
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          type: "number",
        },
      },
      body: { description: "pet type", required: true, model: "PetType" },
    },
    responses: {
      200: { description: "Success" },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpPut(
    "/:id",
    ValidateDtoMiddleware(UpdatePetTypeDto.Params, "params"),
    ValidateDtoMiddleware(UpdatePetTypeDto.Body, "body")
  )
  public async update(
    @requestParam("id") id: string,
    @requestBody() body: UpdatePetTypeDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    const response = this._updatePetTypeService.execute(id, body);

    return this.json(response);
  }

  @ApiOperationDelete({
    path: "/:id",
    description: "Delete pet type",
    summary: "Delete pet type",
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          type: "number",
        },
      },
    },
    responses: {
      200: { description: "Success" },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpDelete("/:id", ValidateDtoMiddleware(UpdatePetTypeDto.Params, "params"))
  public async delete(
    @requestParam("id") id: string
  ): Promise<interfaces.IHttpActionResult> {
    this._deletePetTypeService.execute(id);

    return this.json({});
  }
}
