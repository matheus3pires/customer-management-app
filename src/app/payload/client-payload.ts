import {PhoneRequestPayload} from './phone-payload';
import {AddressRequestPayload} from './address-payload';

export interface ClientRequestPayload {
  name: string;
  cpf: string;
  phones: PhoneRequestPayload[];
  addresses: AddressRequestPayload[];
}
