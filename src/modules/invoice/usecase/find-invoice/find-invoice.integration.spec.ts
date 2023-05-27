import { Sequelize } from "sequelize-typescript";
import FindInvoiceUsecase from "./find-invoice.usecase";
import { InvoiceModel } from "../../repository/invoice.model";
import { InvoiceRepository } from "../../repository/invoice.repository";
import GenerateInvoiceUseCase from "../generate-invoice/generate-invoice.usecase";
import { ProductModel } from "../../repository/invoice.product.model";

describe("Find Invoice integration test", () => {
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

  it("should find invoice", async () => {
    const invoiceRepository = new InvoiceRepository();

    const genrateInvoice = new GenerateInvoiceUseCase(invoiceRepository);

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
    };

    await genrateInvoice.execute(invoice);

    const findInvoiceUseCase = new FindInvoiceUsecase(invoiceRepository);

    const input = {
      id: "1",
    };

    const result = await findInvoiceUseCase.execute(input);

    expect(result.id).toBe(invoice.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.street);
    expect(result.address.number).toBe(invoice.number);
    expect(result.address.complement).toBe(invoice.complement);
    expect(result.address.city).toBe(invoice.city);
    expect(result.address.state).toBe(invoice.state);
    expect(result.address.zipCode).toBe(invoice.zipCode);
    expect(result.items[0].id).toBe(product.id);
    expect(result.items[0].name).toBe(product.name);
    expect(result.items[0].price).toBe(product.price);
    expect(result.total).toBe(59.9);
    expect(result.createdAt).toEqual(expect.any(Date));
  });
});
