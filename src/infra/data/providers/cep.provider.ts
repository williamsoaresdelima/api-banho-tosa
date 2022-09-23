import axios from 'axios';
import { injectable } from 'inversify';

import { CepProviderInterface, CepProviderResponse } from "../../../core/providers/data/cep-provider.interface";

@injectable()
export class CepProvider implements CepProviderInterface {
  async findAddressByCep(cep: string): Promise<CepProviderResponse> {
    try {
      const response = await axios.get<CepProviderResponse>(`https://viacep.com.br/ws/${cep}/json`);

      console.log('RESPONSE_CEP_PROVIDER: ', response.data)

      return response.data
    } catch (error) {
      return null
    }
  }
}