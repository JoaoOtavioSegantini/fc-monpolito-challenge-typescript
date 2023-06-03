import Id from "../../@shared/domain/value-object/id.value-object";
import { AppError } from "../../../infrastructure/api/middlewares/error.handlers";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      number: client.number,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      street: client.street,
      complement: client.complement,
      document: client.document,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({ where: { id } });

    if (!client) {
      throw new AppError(404, "Client not found");
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      city: client.city,
      complement: client.complement,
      street: client.street,
      number: client.number,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
