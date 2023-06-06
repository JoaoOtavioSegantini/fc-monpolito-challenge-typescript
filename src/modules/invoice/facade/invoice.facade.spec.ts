import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { ProductModel } from "../repository/invoice.product.model";

describe("InvoiceFacade test", () => {
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

  it("should create a transaction", async () => {
    const products = [
      {
        id: "1",
        name: "test 1",
        price: 40,
      },
      {
        id: "2",
        name: "test 2",
        price: 60,
      },
    ];

    const inputInvoice = {
      id: "1",
      name: "a simple facade",
      document: "x",
      street: "a simple street",
      number: "123",
      complement: "a simple complement",
      city: "Faker city",
      state: "Faker state",
      zipCode: "Faker zipcode",
      items: products,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const facade = InvoiceFacadeFactory.create();

    const data = new Date();

    jest.useFakeTimers().setSystemTime(data);

    await facade.generate(inputInvoice);
    const invoiceDb = await InvoiceModel.findOne({
      where: { id: "1" },
      include: ["items"],
    });

    expect(invoiceDb.toJSON()).toStrictEqual({
      city: inputInvoice.city,
      complement: inputInvoice.complement,
      createdAt: data,
      document: inputInvoice.document,
      id: inputInvoice.id,
      items: [
        {
          id: invoiceDb.items[0].id,
          invoice_id: "1",
          name: products[0].name,
          price: products[0].price,
          createdAt: data,
          updatedAt: data,
        },
        {
          id: invoiceDb.items[1].id,
          invoice_id: "1",
          name: products[1].name,
          price: products[1].price,
          createdAt: data,
          updatedAt: data,
        },
      ],
      name: inputInvoice.name,
      number: inputInvoice.number,
      state: inputInvoice.state,
      street: inputInvoice.street,
      updatedAt: data,
      zipCode: inputInvoice.zipCode,
    });
  });
});
