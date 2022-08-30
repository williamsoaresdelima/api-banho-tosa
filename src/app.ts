import "reflect-metadata";

import * as bodyParser from 'body-parser';
import * as express from 'express';

import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import TYPES from "./types";

import "./presentation/controllers/pet.controller";

import { CustomMiddleware } from "./presentation/middlewares/custom.middleware";

import { ListPetUseCase } from "./core/usecases/pet/list-pet/list-pet.usecase";
import { ListPetInterface } from "./core/usecases/pet/list-pet/list-pet.interface";

import { CreatePetUseCase } from "./core/usecases/pet/create-pet/create-pet.usecase";
import { CreatePetInterface } from "./core/usecases/pet/create-pet/create-pet.interface";

import { FindPetByIdUseCase } from './core/usecases/pet/find-pet-by-id/find-pet-by-id.usecase'
import { FindPetByIdInterface } from './core/usecases/pet/find-pet-by-id/find-pet-by-id.interface'

import { UpdatePetUseCase } from "./core/usecases/pet/update-pet/update-pet.usecase";
import { UpdatePetInterface } from "./core/usecases/pet/update-pet/update-pet.interface";

import { DeletePetUseCase } from "./core/usecases/pet/delete-pet/delete-pet.usecase";
import { DeletePetInterface } from "./core//usecases/pet/delete-pet/delete-pet.interface";

import { PetRepository } from "./infra/data/repositories/pet.repository";
import { PetRepositoryInterface } from "./core/providers/data/pet-repository.interface";

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
		container.bind<FindPetByIdInterface>(TYPES.FindPetByIdInterface).to(FindPetByIdUseCase);
		container.bind<UpdatePetInterface>(TYPES.UpdatePetInterface).to(UpdatePetUseCase);
		container.bind<DeletePetInterface>(TYPES.DeletePetInterface).to(DeletePetUseCase);
		container.bind<PetRepositoryInterface>(TYPES.PetRepositoryInterface).to(PetRepository);
		container.bind<express.RequestHandler>(TYPES.CustomMiddleware).toConstantValue(CustomMiddleware);
	}

	createService(): void {
		const server: InversifyExpressServer = new InversifyExpressServer(container);

		server.setConfig((app) => {
			app.use(express.json());
		});

		//todo: config server  
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
