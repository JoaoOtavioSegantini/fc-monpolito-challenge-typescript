import { Sequelize } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import { ClientModel } from "../repository/client.model";

describe("ClientAdmFacade test", () => {
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

  it("should create a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const now = new Date();

    jest.useFakeTimers().setSystemTime(now);

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      city: "Address 1",
    };

    await facade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client.city).toBe("Address 1");
    expect(client.createdAt).toStrictEqual(now);
    expect(client.email).toBe("x@x.com");
    expect(client.id).toBe("1");
    expect(client.name).toBe("Client 1");
    expect(client.updatedAt).toStrictEqual(now);
  });

  it("should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      city: "Address 1",
    };

    await facade.add(input);

    const client = await facade.find(input);

    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.city).toBe(input.city);
  });
});
