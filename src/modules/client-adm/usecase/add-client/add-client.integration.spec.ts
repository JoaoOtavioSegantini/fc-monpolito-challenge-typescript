import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../repository/client.model";
import ClientRepository from "../../repository/client.repository";
import AddClientUseCase from "./add-client.usecase";

describe("Add client integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    jest.useFakeTimers().setSystemTime(new Date(2023, 9, 1, 7));

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should add a client", async () => {
    const clientRepository = new ClientRepository();
    const usecase = new AddClientUseCase(clientRepository);

    const input = {
      name: "Client 1",
      email: "x@x.com",
      city: "Address 1",
    };

    const result = await usecase.execute(input);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.city).toEqual(input.city);
  });
});
