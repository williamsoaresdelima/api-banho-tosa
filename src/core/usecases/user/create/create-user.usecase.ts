import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";

import { IUserDbModel } from "src/infra/data/models/user.model";
import { CreateUserInterface, CreateUserUseCaseParams } from "./create-user.interface";
import { UserRepositoryInterface } from "@core/providers/data/user-repository.interface";

@injectable()
export class CreateUserUseCase implements CreateUserInterface {

  private _userRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface,
  ) {
    this._userRepository = userRepository;
  }

  async execute(dto: CreateUserUseCaseParams): Promise<IUserDbModel> {
    

    const result = await this._userRepository.create({
      email: dto.email,
      name: dto.name,
      password: dto.password
    });

    return result;
  }
}