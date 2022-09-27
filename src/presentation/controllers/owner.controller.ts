import { inject } from "inversify";
import {
  httpGet,
  httpPut,
  httpPost,
  interfaces,
  httpDelete,
  controller,
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

import { ListOwnerDto } from "../dtos/list-owner.dto";
import { UpdateOwnerDto } from "../dtos/update-owner.dto";
import { CreateOwnerDto } from "../dtos/create-owner.dto";
import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";
import { ListOwnerInterface } from "../../core/usecases/owner/list/list-owner.interface";
import { UpdateOwnerInterface } from "../../core/usecases/owner/update/update-owner.interface";
import { CreateOwnerInterface } from "../../core/usecases/owner/create/create-owner.interface";
import { DeleteOwnerInterface } from "../../core/usecases/owner/delete/delete-owner.interface";
import { ValidateTokenMiddleware } from "../../presentation/middlewares/validate-token.middleware";
import { FindOwnerByIdInterface } from "../../core/usecases/owner/find-by-id/find-owner-by-id.interface";

@ApiPath({
  path: "/owner",
  name: "Owner",
  security: { basicAuth: [] },
})
@controller("/owner", ValidateTokenMiddleware)
export class OwnerController
  extends BaseHttpController
  implements interfaces.Controller
{
  private _listOwnerService: ListOwnerInterface;
  private _deleteOwnerService: DeleteOwnerInterface;
  private _updateOwnerService: UpdateOwnerInterface;
  private _createOwnerService: CreateOwnerInterface;
  private _findOwnerByIdService: FindOwnerByIdInterface;

  constructor(
    @inject(TYPES.ListOwnerInterface) listOwnerUseCase: ListOwnerInterface,
    @inject(TYPES.CreateOwnerInterface)
    createOwnerUseCase: CreateOwnerInterface,
    @inject(TYPES.FindOwnerByIdInterface)
    findOwnerByIdUseCase: FindOwnerByIdInterface,
    @inject(TYPES.UpdateOwnerInterface)
    updateOwnerUseCase: UpdateOwnerInterface,
    @inject(TYPES.DeleteOwnerInterface) deleteOwnerUseCase: DeleteOwnerInterface
  ) {
    super();
    this._listOwnerService = listOwnerUseCase;
    this._createOwnerService = createOwnerUseCase;
    this._updateOwnerService = updateOwnerUseCase;
    this._deleteOwnerService = deleteOwnerUseCase;
    this._findOwnerByIdService = findOwnerByIdUseCase;
  }

  @ApiOperationGet({
    description: "Get owners objects list",
    summary: "Get owners list",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: "Owner",
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet("/")
  public async findAll(
    @queryParam() query: ListOwnerDto.Query
  ): Promise<interfaces.IHttpActionResult> {
    const owners = await this._listOwnerService.execute(query);

    return this.json(owners);
  }

  @ApiOperationGet({
    path: "/:id",
    description: "Get owner objects",
    summary: "Get owner",
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
        model: "Owner",
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
    const owner = await this._findOwnerByIdService.execute(id);

    return this.json(owner);
  }

  @ApiOperationPost({
    description: "Create a owner",
    summary: "Create owner",
    parameters: {
      body: { description: "New owner", required: true, model: "Owner" },
    },
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" },
    },
  })
  @httpPost("/")
  public async create(
    @requestBody() body: CreateOwnerDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    const user = await this._createOwnerService.execute(body);

    return this.json(user);
  }

  @ApiOperationPut({
    path: "/:id",
    description: "Update owner",
    summary: "Update owner",
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          type: "number",
        },
      },
      body: { description: "New owner", required: true, model: "Owner" },
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
    ValidateDtoMiddleware(UpdateOwnerDto.Params, "params"),
    ValidateDtoMiddleware(UpdateOwnerDto.Body, "body")
  )
  public async update(
    @requestParam("id") id: string,
    @requestBody() body: UpdateOwnerDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    const response = await this._updateOwnerService.execute(id, body as any);

    return this.json(response);
  }

  @ApiOperationDelete({
    path: "/:id",
    description: "Delete owner",
    summary: "Delete owner",
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
  @httpDelete("/:id")
  public async delete(
    @requestParam("id") id: string
  ): Promise<interfaces.IHttpActionResult> {
    await this._deleteOwnerService.execute(id);

    return this.json({});
  }
}
