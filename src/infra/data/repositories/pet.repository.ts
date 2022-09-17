import { Model } from "mongoose";
import { injectable } from "inversify";

import {
	PetRepositoryInterface,
	PetRespositorySearchParams,
	PetRespositoryCreateParams,
} from "../../../core/providers/data/pet-repository.interface";

import { IPetDbModel, PetDbModel } from "../models/pet.model";

@injectable()
export class PetRepository implements PetRepositoryInterface {

	private _petDbModel: Model<IPetDbModel>

	constructor() {
		this._petDbModel = PetDbModel
	}

	async create(dto: PetRespositoryCreateParams): Promise<IPetDbModel> {
		const pet = await this._petDbModel.create({
			name: dto.name,
			age: dto.age,
			petType: dto.petType
		})

		await pet.save()

		return pet
	}

	async search(model: PetRespositorySearchParams): Promise<IPetDbModel[]> {
		const pets = await this._petDbModel.find()
		
		return pets
	}

	async findById(id: string): Promise<IPetDbModel> {
		const pet = await this._petDbModel.findById(id)

		return pet as any
	}

	async update(id: string, body: PetRespositoryCreateParams): Promise<void> {
		await this._petDbModel.updateOne({ _id: id }, { ...body })
	}

	async delete(id: string): Promise<void> {
		await this._petDbModel.deleteOne({ _id: id });
	}
}