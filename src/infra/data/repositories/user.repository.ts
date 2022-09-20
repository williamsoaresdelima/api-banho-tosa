import { Model } from "mongoose";
import { injectable } from "inversify";

import { UserRepositoryInterface, UserRespositoryCreateParams, UserRespositorySearchParams } from "@core/providers/data/user-repository.interface";
import { IUserDbModel, UserDbModel } from "../models/user.model";

@injectable()
export class UserRepository implements UserRepositoryInterface {

	private _userDbModel: Model<IUserDbModel>

	constructor() {
		this._userDbModel = UserDbModel
	}

	async create(dto: UserRespositoryCreateParams): Promise<IUserDbModel> {
		const user = await this._userDbModel.create({
			name: dto.name,
			email: dto.email,
			password: dto.password
		});

		await user.save();

		delete user.password;

		return user;
	}

	async search(model: UserRespositorySearchParams): Promise<IUserDbModel[]> {
		const users = await this._userDbModel.find().select('-password');
		
		return users;
	}

	async findById(id: string): Promise<IUserDbModel> {
		const user = await this._userDbModel.findById(id).select('-password');

		return user as any;
	}

	async update(id: string, body: UserRespositoryCreateParams): Promise<void> {
		await this._userDbModel.updateOne({ _id: id }, { ...body })
	}

	async delete(id: string): Promise<void> {
		await this._userDbModel.deleteOne({ _id: id });
	}
}