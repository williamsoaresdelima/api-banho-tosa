import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";

import { IUserDbModel } from "src/infra/data/models/user.model";
import { DeleteUserInterface } from "./delete-user.interface";
import { UserRepositoryInterface } from "@core/providers/data/user-repository.interface";

@injectable()
export class DeleteUserUseCase implements DeleteUserInterface {

  private _userRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface,
  ) {
    this._userRepository = userRepository;
  }

  async execute(id: string): Promise<void> {    
    await this._userRepository.delete(id);
  }
}