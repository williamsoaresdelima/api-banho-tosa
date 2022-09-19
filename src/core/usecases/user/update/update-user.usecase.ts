import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";

import { UpdateUserInterface, UpdateUserUseCaseParams } from "./update-user.interface";
import { UserRepositoryInterface } from "@core/providers/data/user-repository.interface";

@injectable()
export class UpdateUserUseCase implements UpdateUserInterface {

  private _userRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface,
  ) {
    this._userRepository = userRepository;
  }

  async execute(id: string, dto: UpdateUserUseCaseParams): Promise<void> {    
    const user = await this._userRepository.findById(id);

    if (!user) {
      throw new Error("user does not exists");
    }

    await this._userRepository.update(id, dto);
  }
}
