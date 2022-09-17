import { Model } from "mongoose";
import { injectable } from "inversify";

import {
	PetTypeRepositoryInterface,
	PetTypeRespositoryCreateParams,
	PetTypeRespositorySearchParams
} from "../../../core/providers/data/pet-type-repository.interface";

import { PetTypeEntity } from "../../../core/entity/pet-type.entity";
import { IPetTypeDbModel, PetTypeDbModel } from "../models/pet-type.model";

let data: PetTypeEntity[] = [];

@injectable()
export class PetTypeRepository implements PetTypeRepositoryInterface {

	private _petTypeDbModel: Model<IPetTypeDbModel>

	constructor() {
		this._petTypeDbModel = PetTypeDbModel
	}

	async create(dto: PetTypeRespositoryCreateParams): Promise<IPetTypeDbModel> {
		const petType = await this._petTypeDbModel.create({
			name: dto.name
		});

		await petType.save();

		return petType;
	}

	async search(dto: PetTypeRespositorySearchParams): Promise<IPetTypeDbModel[]> {
		return this._petTypeDbModel.find();
	}

	async findById(id: string): Promise<IPetTypeDbModel> {
		return this._petTypeDbModel.findById(id);
	}

	async update(id: string, body: PetTypeRespositoryCreateParams): Promise<void> {
		await this._petTypeDbModel.updateOne({ _id: id }, { ...body });
	}

	async delete(id: string): Promise<void> {
		await this._petTypeDbModel.deleteOne({ _id: id });
	}
}