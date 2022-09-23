export type CepProviderResponse = {
  cep: string,
  logradouro: string,
  numero: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string
}

export interface CepProviderInterface {
	findAddressByCep(cep: string): Promise<CepProviderResponse | null>;
}
