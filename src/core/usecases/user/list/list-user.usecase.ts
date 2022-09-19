import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";

import { ListUserInterface } from "./list-user.interface";
import { IUserDbModel } from "../../../../infra/data/models/user.model";
import { UserRepositoryInterface } from "@core/providers/data/user-repository.interface";

@injectable()
export class ListUserUseCase implements ListUserInterface {

  private _userRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface,
  ) {
    this._userRepository = userRepository;
  }

  async execute(filters: any): Promise<IUserDbModel[]> {    
    return this._userRepository.search(filters);
  }
}
