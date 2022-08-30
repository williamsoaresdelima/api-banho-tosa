import "reflect-metadata";

import * as bodyParser from 'body-parser';
import * as express from 'express';

import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import TYPES from "./types";

import "./presentation/controllers/pet.controller";
import "./presentation/controllers/pet-type.controller";
import { PetRepository } from "./infra/data/repositories/pet.repository";
import { ListPetUseCase } from "./core/usecases/pet/list-pet/list-pet.usecase";
import { CustomMiddleware } from "./presentation/middlewares/custom.middleware";
import { PetTypeRepository } from "./infra/data/repositories/pet-type.repository";
import { ListPetInterface } from "./core/usecases/pet/list-pet/list-pet.interface";
import { CreatePetUseCase } from "./core/usecases/pet/create-pet/create-pet.usecase";
import { UpdatePetUseCase } from "./core/usecases/pet/update-pet/update-pet.usecase";
import { DeletePetUseCase } from "./core/usecases/pet/delete-pet/delete-pet.usecase";
import { PetRepositoryInterface } from "./core/providers/data/pet-repository.interface";
import { CreatePetInterface } from "./core/usecases/pet/create-pet/create-pet.interface";
import { UpdatePetInterface } from "./core/usecases/pet/update-pet/update-pet.interface";
import { DeletePetInterface } from "./core//usecases/pet/delete-pet/delete-pet.interface";
import { FindPetByIdUseCase } from './core/usecases/pet/find-pet-by-id/find-pet-by-id.usecase';
import { PetTypeRepositoryInterface } from "./core/providers/data/pet-type-repository.interface";
import { ListPetTypeUseCase } from "./core/usecases/pet-type/list-pet-type/list-pet-type.usecase";
import { FindPetByIdInterface } from './core/usecases/pet/find-pet-by-id/find-pet-by-id.interface';
import { CreatePetTypeUseCase } from "./core/usecases/pet-type/create-pet-type/create-pet.usecase";
import { UpdatePetTypeUseCase } from "./core/usecases/pet-type/update-pet-type/update-pet.usecase";
import { DeletePetTypeUseCase } from "./core/usecases/pet-type/delete-pet-type/delete-pet.usecase";
import { ListPetTypeInterface } from "./core/usecases/pet-type/list-pet-type/list-pet-type.interface";
import { CreatePetTypeInterface } from "./core/usecases/pet-type/create-pet-type/create-pet-type.interface";
import { UpdatePetTypeInterface } from "./core/usecases/pet-type/update-pet-type/update-pet.-typeinterface";
import { DeletePetTypeInterface } from "./core/usecases/pet-type/delete-pet-type/delete-pet-type.interface";
import { FindPetTypeByIdUseCase } from "./core/usecases/pet-type/find-pet-type-by-id/find-pet-type-by-id.usecase";
import { FindPetTypeByIdInterface } from "./core/usecases/pet-type/find-pet-type-by-id/find-pet-type-by-id.interface";

const PORT = process.env.PORT || 3000;

const container = new Container();

export class App {

	constructor() {
		this.configDependencies();
		this.createService();
	}

	configDependencies(): void {
		container.bind<ListPetInterface>(TYPES.ListPetInterface).to(ListPetUseCase);
		container.bind<CreatePetInterface>(TYPES.CreatePetInterface).to(CreatePetUseCase);
		container.bind<UpdatePetInterface>(TYPES.UpdatePetInterface).to(UpdatePetUseCase);
		container.bind<DeletePetInterface>(TYPES.DeletePetInterface).to(DeletePetUseCase);
		container.bind<PetRepositoryInterface>(TYPES.PetRepositoryInterface).to(PetRepository);
		container.bind<ListPetTypeInterface>(TYPES.ListPetTypeInterface).to(ListPetTypeUseCase);
		container.bind<FindPetByIdInterface>(TYPES.FindPetByIdInterface).to(FindPetByIdUseCase);
		container.bind<DeletePetTypeInterface>(TYPES.DeletePetTypeInterface).to(DeletePetTypeUseCase);
		container.bind<CreatePetTypeInterface>(TYPES.CreatePetTypeInterface).to(CreatePetTypeUseCase);
		container.bind<UpdatePetTypeInterface>(TYPES.UpdatePetTypeInterface).to(UpdatePetTypeUseCase);
		container.bind<express.RequestHandler>(TYPES.CustomMiddleware).toConstantValue(CustomMiddleware);
		container.bind<PetTypeRepositoryInterface>(TYPES.PetTypeRepositoryInterface).to(PetTypeRepository);
		container.bind<FindPetTypeByIdInterface>(TYPES.FindPetTypeByIdInterface).to(FindPetTypeByIdUseCase);
	}

	createService(): void {
		const server: InversifyExpressServer = new InversifyExpressServer(container);

		server.setConfig((app) => {
			app.use(express.json());
		});

		server.setErrorConfig((app) => {

			app.use((err, req, res, next) => {
				if (err) {

					if (err.name == 'BusinessError') {
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
		})

		const app = server.build();

		app.listen(PORT, () => {
			console.log("Servidor iniciado na porta 3000");
		});
	}
}

export default new App();
