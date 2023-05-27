import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { ProductModel } from "./invoice.product.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/invoice.product.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Invoice from "../domain/invoice.entity";
import { InvoiceRepository } from "./invoice.repository";

describe("Invoice Repository test", () => {
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

  it("should create a invoice", async () => {
    const inputProduct = {
      id: new Id("1"),
      name: "test produt",
      price: 85,
    };

    const product = new Product(inputProduct);
    const now = new Date();
    jest.useFakeTimers("modern").setSystemTime(now);
    const inputInvoice = {
      id: new Id("1"),
      name: "a simple facade",
      document: "x",
      address: new Address(
        "a simple street",
        "a simple complement",
        "123",
        "Faker city",
        "Faker state",
        "Faker zipcode"
      ),
      items: [product],
      createdAt: now,
      updatedAt: now,
    };

    const invoice = new Invoice(inputInvoice);
    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: ["items"],
    });

    expect(invoiceDb.toJSON()).toStrictEqual({
      city: inputInvoice.address.city,
      complement: inputInvoice.address.complement,
      createdAt: now,
      document: inputInvoice.document,
      id: inputInvoice.id.id,
      items: [
        {
          id: inputProduct.id.id,
          invoiceId: "1",
          name: inputProduct.name,
          price: inputProduct.price,
        },
      ],
      name: inputInvoice.name,
      number: inputInvoice.address.number,
      state: inputInvoice.address.state,
      street: inputInvoice.address.street,
      updatedAt: now,
      zipCode: inputInvoice.address.zipCode,
    });
  });

  it("should find a invoice", async () => {
    const inputProduct = {
      id: new Id("1"),
      name: "test product name",
      price: 62,
    };
    const product = new Product(inputProduct);
    const now = new Date();
    jest.useFakeTimers("modern").setSystemTime(now);

    const inputInvoice = {
      id: new Id("1"),
      name: "a faker name",
      document: "a faker document",
      address: new Address(
        "a simple street",
        "a simple complement",
        "123",
        "Faker city",
        "Faker state",
        "Faker zipcode"
      ),
      items: [product],
      createdAt: now,
      updatedAt: now,
    };

    const invoice = new Invoice(inputInvoice);
    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.generate(invoice);

    const findInvoice = await invoiceRepository.find(invoice.id.id);

    expect(findInvoice.id.id).toBe(invoice.id.id);
    expect(findInvoice.name).toBe(invoice.name);
    expect(findInvoice.document).toBe(invoice.document);
    expect(findInvoice.address.street).toBe(invoice.address.street);
    expect(findInvoice.address.number).toBe(invoice.address.number);
    expect(findInvoice.address.complement).toBe(invoice.address.complement);
    expect(findInvoice.address.city).toBe(invoice.address.city);
    expect(findInvoice.address.state).toBe(invoice.address.state);
    expect(findInvoice.address.zipCode).toBe(invoice.address.zipCode);
    expect(findInvoice.createdAt).toEqual(invoice.createdAt);
    expect(findInvoice.updatedAt).toEqual(invoice.updatedAt);
    expect(findInvoice.total()).toEqual(62);
  });
});
