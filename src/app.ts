import 'dotenv/config';
import "reflect-metadata";
import mongoose from "mongoose";
import * as express from "express";
import { Container } from "inversify";
import * as swagger from "swagger-express-ts";
import { SwaggerDefinitionConstant } from "swagger-express-ts";
import { InversifyExpressServer } from "inversify-express-utils";

import TYPES from "./types";

import "./presentation/controllers/pet.controller";
import "./presentation/controllers/user.controller";
import "./presentation/controllers/auth.controller";
import "./presentation/controllers/owner.controller";
import "./presentation/controllers/pet-type.controller";

import { CepProvider } from "./infra/data/providers/cep.provider";
import { LoginUseCase } from "./core/usecases/auth/login/login.usecase";
import { PetRepository } from "./infra/data/repositories/pet.repository";
import { UserRepository } from "./infra/data/repositories/user.repository";
import { LoginInterface } from "./core/usecases/auth/login/login.interface";
import { OwnerRepository } from "./infra/data/repositories/owner.repository";
import { ListUserUseCase } from "./core/usecases/user/list/list-user.usecase";
import { ListPetUseCase } from "./core/usecases/pet/list-pet/list-pet.usecase";
import { CustomMiddleware } from "./presentation/middlewares/custom.middleware";
import { ListOwnerUseCase } from "./core/usecases/owner/list/list-owner.usecase";
import { ListUserInterface } from "./core/usecases/user/list/list-user.interface";
import { PetTypeRepository } from "./infra/data/repositories/pet-type.repository";
import { ListPetInterface } from "./core/usecases/pet/list-pet/list-pet.interface";
import { DeleteUserUseCase } from "./core/usecases/user/delete/delete-user.usecase";
import { UpdateUserUseCase } from "./core/usecases/user/update/update-user.usecase";
import { CreateUserUseCase } from "./core/usecases/user/create/create-user.usecase";
import { CepProviderInterface } from "./core/providers/data/cep-provider.interface";
import { UpdatePetUseCase } from "./core/usecases/pet/update-pet/update-pet.usecase";
import { ListOwnerInterface } from "./core/usecases/owner/list/list-owner.interface";
import { DeletePetUseCase } from "./core/usecases/pet/delete-pet/delete-pet.usecase";
import { CreatePetUseCase } from "./core/usecases/pet/create-pet/create-pet.usecase";
import { DeleteOwnerUseCase } from "./core/usecases/owner/delete/delete-owner.usecase";
import { UpdateOwnerUseCase } from "./core/usecases/owner/update/update-owner.usecase";
import { CreateOwnerUseCase } from "./core/usecases/owner/create/create-owner.usecase";
import { UpdateUserInterface } from "./core/usecases/user/update/update-user.interface";
import { CreateUserInterface } from "./core/usecases/user/create/create-user.interface";
import { PetRepositoryInterface } from "./core/providers/data/pet-repository.interface";
import { DeleteUserInterface } from "./core/usecases/user/delete/delete-user.interface";
import { CreatePetInterface } from "./core/usecases/pet/create-pet/create-pet.interface";
import { UpdatePetInterface } from "./core/usecases/pet/update-pet/update-pet.interface";
import { DeleteOwnerInterface } from "./core/usecases/owner/delete/delete-owner.interface";
import { UpdateOwnerInterface } from "./core/usecases/owner/update/update-owner.interface";
import { UserRepositoryInterface } from "./core/providers/data/user-repository.interface";
import { DeletePetInterface } from "./core//usecases/pet/delete-pet/delete-pet.interface";
import { CreateOwnerInterface } from "./core/usecases/owner/create/create-owner.interface";
import { OwnerRepositoryInterface } from "./core/providers/data/owner-repository.interface";
import { FindPetByIdUseCase } from "./core/usecases/pet/find-pet-by-id/find-pet-by-id.usecase";
import { PetTypeRepositoryInterface } from "./core/providers/data/pet-type-repository.interface";
import { ListPetTypeUseCase } from "./core/usecases/pet-type/list-pet-type/list-pet-type.usecase";
import { FindUserByIdUserUseCase } from "./core/usecases/user/find-by-id/find-user-by-id.usecase";
import { FindUserByIdInterface } from "./core/usecases/user/find-by-id/find-user-by-id.interface";
import { CreatePetTypeUseCase } from "./core/usecases/pet-type/create-pet-type/create-pet.usecase";
import { UpdatePetTypeUseCase } from "./core/usecases/pet-type/update-pet-type/update-pet.usecase";
import { FindPetByIdInterface } from "./core/usecases/pet/find-pet-by-id/find-pet-by-id.interface";
import { DeletePetTypeUseCase } from "./core/usecases/pet-type/delete-pet-type/delete-pet.usecase";
import { FindOwnerByIdInterface } from "./core/usecases/owner/find-by-id/find-owner-by-id.interface";
import { FindOwnerByIdOwnerUseCase } from "./core/usecases/owner/find-by-id/find-owner-by-id.usecase";
import { ListPetTypeInterface } from "./core/usecases/pet-type/list-pet-type/list-pet-type.interface";
import { CreatePetTypeInterface } from "./core/usecases/pet-type/create-pet-type/create-pet-type.interface";
import { UpdatePetTypeInterface } from "./core/usecases/pet-type/update-pet-type/update-pet.-type.interface";
import { DeletePetTypeInterface } from "./core/usecases/pet-type/delete-pet-type/delete-pet-type.interface";
import { FindPetTypeByIdUseCase } from "./core/usecases/pet-type/find-pet-type-by-id/find-pet-type-by-id.usecase";
import { FindPetTypeByIdInterface } from "./core/usecases/pet-type/find-pet-type-by-id/find-pet-type-by-id.interface";

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

const container = new Container();

export class App {
  constructor() {
    this.configDependencies();
    this.createService();
  }

  configDependencies(): void {
    container
      .bind<ListOwnerInterface>(TYPES.ListOwnerInterface)
      .to(ListOwnerUseCase);
    container
      .bind<FindOwnerByIdInterface>(TYPES.FindOwnerByIdInterface)
      .to(FindOwnerByIdOwnerUseCase);
    container
      .bind<DeleteOwnerInterface>(TYPES.DeleteOwnerInterface)
      .to(DeleteOwnerUseCase);
    container
      .bind<UpdateOwnerInterface>(TYPES.UpdateOwnerInterface)
      .to(UpdateOwnerUseCase);
    container.bind<LoginInterface>(TYPES.LoginInterface).to(LoginUseCase);
    container
      .bind<CepProviderInterface>(TYPES.CepProviderInterface)
      .to(CepProvider);
    container
      .bind<CreateOwnerInterface>(TYPES.CreateOwnerInterface)
      .to(CreateOwnerUseCase);
    container
      .bind<OwnerRepositoryInterface>(TYPES.OwnerRepositoryInterface)
      .to(OwnerRepository);
    container
      .bind<ListUserInterface>(TYPES.ListUserInterface)
      .to(ListUserUseCase);
    container
      .bind<FindUserByIdInterface>(TYPES.FindUserByIdInterface)
      .to(FindUserByIdUserUseCase);
    container
      .bind<CreateUserInterface>(TYPES.CreateUserInterface)
      .to(CreateUserUseCase);
    container
      .bind<UpdateUserInterface>(TYPES.UpdateUserInterface)
      .to(UpdateUserUseCase);
    container
      .bind<DeleteUserInterface>(TYPES.DeleteUserInterface)
      .to(DeleteUserUseCase);
    container.bind<ListPetInterface>(TYPES.ListPetInterface).to(ListPetUseCase);
    container
      .bind<CreatePetInterface>(TYPES.CreatePetInterface)
      .to(CreatePetUseCase);
    container
      .bind<UpdatePetInterface>(TYPES.UpdatePetInterface)
      .to(UpdatePetUseCase);
    container
      .bind<DeletePetInterface>(TYPES.DeletePetInterface)
      .to(DeletePetUseCase);
    container
      .bind<PetRepositoryInterface>(TYPES.PetRepositoryInterface)
      .to(PetRepository);
    container
      .bind<ListPetTypeInterface>(TYPES.ListPetTypeInterface)
      .to(ListPetTypeUseCase);
    container
      .bind<FindPetByIdInterface>(TYPES.FindPetByIdInterface)
      .to(FindPetByIdUseCase);
    container
      .bind<DeletePetTypeInterface>(TYPES.DeletePetTypeInterface)
      .to(DeletePetTypeUseCase);
    container
      .bind<CreatePetTypeInterface>(TYPES.CreatePetTypeInterface)
      .to(CreatePetTypeUseCase);
    container
      .bind<UpdatePetTypeInterface>(TYPES.UpdatePetTypeInterface)
      .to(UpdatePetTypeUseCase);
    container
      .bind<express.RequestHandler>(TYPES.CustomMiddleware)
      .toConstantValue(CustomMiddleware);
    container
      .bind<PetTypeRepositoryInterface>(TYPES.PetTypeRepositoryInterface)
      .to(PetTypeRepository);
    container
      .bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface)
      .to(UserRepository);
    container
      .bind<FindPetTypeByIdInterface>(TYPES.FindPetTypeByIdInterface)
      .to(FindPetTypeByIdUseCase);
  }

  async createService(): Promise<void> {
    const server: InversifyExpressServer = new InversifyExpressServer(
      container
    );

    server.setConfig((app) => {
      app.use(express.json());
      app.use("/api-docs/swagger", express.static("swagger"));
      app.use(
        "/api-docs/swagger/assets",
        express.static("node_modules/swagger-ui-dist")
      );
      app.use(
        swagger.express({
          definition: {
            info: {
              title: "My api",
              version: "1.0",
            },
            externalDocs: {
              url: "My url",
            },
            // Models can be defined here
          },
        })
      );
    });

    server.setErrorConfig((app) => {
      app.use((err, req, res, next) => {
        if (err) {
          console.log("ERROR: ", err);
          if (err.name == "BusinessError") {
            return res.status(400).json({
              mensagem: err.message,
            });
          }

          return res.status(500).json({
            mensagem: "Internal Server Error",
          });
        }
        next();
      });
    });

    await mongoose.connect(MONGODB_URI);

    const app = server.build();

    app.listen(PORT, () => {
      console.log("Servidor iniciado na porta 3000");
    });
  }
}

export default new App();
