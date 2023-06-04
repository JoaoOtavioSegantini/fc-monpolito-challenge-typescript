import { SequelizeStorage, Umzug } from "umzug";
import { app } from "../express";
import request from "supertest";
import { Sequelize } from "sequelize";
import { InvoiceModel } from "../../../modules/invoice/repository/invoice.model";
import { ProductModel as InvoiceProductModel } from "../../../modules/invoice/repository/invoice.product.model";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";

//@ts-ignore
import faker from "../../../modules/@shared/domain/fixture/faker.cjs";

const sequelize = new Sequelize({ dialect: "sqlite", logging: false });

const umzug = new Umzug({
  migrations: { glob: ["../../migrations/*.ts", { cwd: __dirname }] },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: null,
});

describe("E2E tests", () => {
  beforeEach(async () => {
    await umzug.down({ to: 0 as any }).then(() => umzug.up());
  });

  afterAll(async () => {
    await umzug.down({ to: 0 as any });
    await sequelize.close();
  });

  it("should create a client", async () => {
    const client = faker.createRandomUser();
    const response = await request(app).post("/clients").send(client);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({});
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/clients").send({
      name: "john",
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      errors: { message: "client: Email is required" },
    });
  });

  it("should create a product", async () => {
    const product = faker.createRandomProduct();

    const response = await request(app).post("/products").send(product);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(product.name);
    expect(response.body.id).toBeDefined();
    expect(response.body.description).toBe(product.description);
    expect(response.body.purchasePrice).toBe(product.purchasePrice);
    expect(response.body.stock).toBe(product.stock);
  });
  it("should find a invoice", async () => {
    const product = {
      id: "1",
      name: "faker product",
      price: 59.9,
    };

    const invoice = {
      id: "1",
      name: "John A. Mondy",
      document: "7433966201",
      street: "Walnut Hill Drive",
      number: "3383",
      complement: "Dayton, OH 45402",
      city: "City xunsx",
      state: "Ohyls",
      zipCode: "3337886-444",
      items: [product],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await InvoiceModel.create(invoice);
    await InvoiceProductModel.create({
      id: "1",
      name: product.name,
      invoice_id: "1",
      price: product.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app).get("/invoice/1");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(invoice.name);
    expect(response.body.id).toBe(invoice.id);
    expect(response.body.document).toBe(invoice.document);
    expect(response.body.address.street).toBe(invoice.street);
    expect(response.body.address.number).toBe(invoice.number);
    expect(response.body.total).toBe(product.price);
    expect(response.body.items[0].id).toBe(Number(product.id));
    expect(response.body.items[0].name).toBe(product.name);
    expect(response.body.items[0].price).toBe(product.price);
  });
  it("should create a checkout", async () => {
    const client = faker.createRandomUser();
    await ClientModel.create({ ...client, id: "1" });

    const product = faker.createRandomProduct();

    const product2 = faker.createRandomProduct();

    const productOne = await request(app).post("/products").send(product);
    const productTwo = await request(app).post("/products").send(product2);

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: [
          { productId: productOne.body.id },
          { productId: productTwo.body.id },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.products[0].productId).toBe(productOne.body.id);
    expect(response.body.products[1].productId).toBe(productTwo.body.id);
    expect(response.body.status).toBe("approved");
    expect(response.body.total).toBe(product.salesPrice + product2.salesPrice);
  });
  it("should not create a checkout when client not found", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "2",
        products: [{ productId: "0" }, { productId: "1" }],
      });

    expect(response.status).toBe(404);
    expect(response.body.errors.message).toBe("Client not found");
  });
  it("should not create a checkout when product not found", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: [{ productId: "0" }, { productId: "1" }],
      });

    expect(response.status).toBe(404);
    expect(response.body.errors.message).toBe("Product with id 0 not found");
  });
});
