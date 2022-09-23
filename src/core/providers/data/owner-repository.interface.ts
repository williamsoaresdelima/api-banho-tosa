import { IOwnerDbModel } from "../../../infra/data/models/owner.model";

export type OwnerRespositorySearchParams = {
  name?: string;
}

export type OwnerRespositoryCreateParams = {
	name: string;
  phone: string;
	address: {
    cep: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string
  }
}

export interface OwnerRepositoryInterface {
	findById(id: string): Promise<IOwnerDbModel>;
	create(dto: OwnerRespositoryCreateParams): Promise<IOwnerDbModel>;
	search(dto: OwnerRespositorySearchParams): Promise<IOwnerDbModel[]>;
	update(id: string, model: OwnerRespositoryCreateParams): Promise<void>;
	delete(id: string): Promise<void>;
}
