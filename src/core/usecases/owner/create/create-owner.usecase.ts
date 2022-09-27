import "reflect-metadata";
import { inject, injectable } from "inversify";

import TYPES from "../../../../types";

import { CreateOwnerInterface, CreateOwnerUseCaseParams } from "./create-owner.interface";

import { IOwnerDbModel } from "src/infra/data/models/owner.model";
import { CepProviderInterface } from "../../../providers/data/cep-provider.interface";
import { OwnerRepositoryInterface } from "../../../providers/data/owner-repository.interface";

@injectable()
export class CreateOwnerUseCase implements CreateOwnerInterface {

  private _cepProvider: CepProviderInterface;
  private _ownerRepository: OwnerRepositoryInterface;

  constructor(
    @inject(TYPES.CepProviderInterface) cepProvider: CepProviderInterface,
    @inject(TYPES.OwnerRepositoryInterface) ownerRepository: OwnerRepositoryInterface
  ) {
    this._cepProvider = cepProvider;
    this._ownerRepository = ownerRepository;
  }

  async execute(dto: CreateOwnerUseCaseParams): Promise<IOwnerDbModel> {
    const { cep, name, number, phone } = dto;

    const address = await this._cepProvider.findAddressByCep(cep);

    if (!address) {
      throw new Error("Address not found");
    }

    const result = await this._ownerRepository.create({
      name,
      phone,
      address: {
        ...address,
        cep,
        numero: number,
      }
    })

    return result;
  }
}