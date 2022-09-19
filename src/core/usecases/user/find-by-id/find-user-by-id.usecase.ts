import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";

import { FindUserByIdInterface } from "./find-user-by-id.interface";
import { IUserDbModel } from "../../../../infra/data/models/user.model";
import { UserRepositoryInterface } from "@core/providers/data/user-repository.interface";

@injectable()
export class FindUserByIdUserUseCase implements FindUserByIdInterface {

  private _userRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface,
  ) {
    this._userRepository = userRepository;
  }

  async execute(id: string): Promise<IUserDbModel> {    
    return this._userRepository.findById(id)
  }
}