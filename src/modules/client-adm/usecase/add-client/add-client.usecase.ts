import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import {
  AddClientInputDto,
  AddClientOutputDto,
} from "./add-client.usecase.dto";

export default class AddClientUseCase {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      number: input.number,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      complement: input.complement,
      street: input.street,
      document: input.document,
    };

    const client = new Client(props);

    await this._clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      number: client.number,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      complement: client.complement,
      street: client.street,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
