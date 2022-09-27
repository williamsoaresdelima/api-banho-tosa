export class UpdateOwnerUseCaseParams {
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

export interface UpdateOwnerInterface {
	execute(id: string, body: UpdateOwnerUseCaseParams): Promise<void>;
}
