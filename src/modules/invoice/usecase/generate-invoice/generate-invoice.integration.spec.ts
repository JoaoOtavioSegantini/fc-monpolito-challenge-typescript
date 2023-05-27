import { Sequelize } from "sequelize-typescript";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";
import { InvoiceModel } from "../../repository/invoice.model";
import { ProductModel } from "../../repository/invoice.product.model";
import { InvoiceRepository } from "../../repository/invoice.repository";

const inputProduct = {
  id: "1",
  name: "Product x",
  invoiceId: "1",
  price: 85,
};

const inputProduct2 = {
  id: "2",
  name: "Product y",
  invoiceId: "1",
  price: 32,
};

const inputInvoice = {
  id: "1",
  name: "John A. Mondy",
  document: "7433966201",
  street: "Walnut Hill Drive",
  number: "3383",
  complement: "Dayton, OH 45402",
  city: "City xunsx",
  state: "Ohyls",
  zipCode: "3337886-444",
  items: [inputProduct, inputProduct2],
};

describe("Generate Invoice integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate invoice", async () => {
    const invoiceRepository = new InvoiceRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);

    const result = await usecase.execute(inputInvoice);

    expect(result.id).toBe(inputInvoice.id);
    expect(result.name).toBe(inputInvoice.name);
    expect(result.document).toBe(inputInvoice.document);
    expect(result.street).toBe(inputInvoice.street);
    expect(result.number).toBe(inputInvoice.number);
    expect(result.complement).toBe(inputInvoice.complement);
    expect(result.city).toBe(inputInvoice.city);
    expect(result.state).toBe(inputInvoice.state);
    expect(result.zipCode).toBe(inputInvoice.zipCode);
    expect(result.items[0].price).toBe(inputInvoice.items[0].price);
    expect(result.total).toBe(117);
  });
});
