import { Sequelize } from "sequelize-typescript";
import FindClientUseCase from "./find-client.usecase";
import { ClientModel } from "../../repository/client.model";
import ClientRepository from "../../repository/client.repository";
import AddClientUseCase from "../add-client/add-client.usecase";

describe("Add client integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a client", async () => {
    const repository = new ClientRepository();
    const usecase = new FindClientUseCase(repository);
    const addUsecase = new AddClientUseCase(repository);

    const now = new Date();
    jest.useFakeTimers("modern").setSystemTime(now);

    const client = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    };

    await addUsecase.execute(client);
    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
    expect(result.createdAt).toEqual(now);
    expect(result.updatedAt).toEqual(now);
  });
});
