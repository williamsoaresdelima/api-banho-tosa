import "reflect-metadata";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";

import { secrets } from "../../../../core/config/secrets";
import { UserRepositoryInterface } from "../../../providers/data/user-repository.interface";
import { LoginInterface, LoginUseCaseParams, ResponseLoginUseCase } from "./login.interface";

@injectable()
export class LoginUseCase implements LoginInterface {

  private _userRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface
  ) {
    this._userRepository = userRepository;
  }

  async execute(dto: LoginUseCaseParams): Promise<ResponseLoginUseCase> {
    const { email, password } = dto;

    const foundUser = await this._userRepository.findByEmail(email)

    if (!foundUser) {
      throw new Error('email or password does not correct');
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      throw new Error('email or password does not correct');
    }

    const token = jwt.sign({ email: foundUser.email }, secrets.SECRET_JWT_CODE)   

    return {
      token
    };
  }
}