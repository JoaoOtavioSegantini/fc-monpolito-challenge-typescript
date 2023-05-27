import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/invoice.product.entity";
import FindInvoiceUsecase from "./find-invoice.usecase";

const product = new Product({
  id: new Id("1"),
  name: "DDD",
  price: 59.9,
});

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice-1",
  document: "NI-1",
  address: new Address(
    "Rua 123",
    "Casa Verde",
    "999",
    "São Paulo",
    "SP",
    "88888-888"
  ),
  items: [product],
});

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find Invoice use case unit test", () => {
  it("should find invoice", async () => {
    const invoiceRepository = MockRepository();
    const findInvoiceUseCase = new FindInvoiceUsecase(invoiceRepository);

    const input = {
      id: "1",
    };

    const result = await findInvoiceUseCase.execute(input);

    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.id).toBe("1");
    expect(result.name).toBe("Invoice-1");
    expect(result.document).toBe("NI-1");
    expect(result.address.street).toBe("Rua 123");
    expect(result.address.number).toBe("999");
    expect(result.address.complement).toBe("Casa Verde");
    expect(result.address.city).toBe("São Paulo");
    expect(result.address.state).toBe("SP");
    expect(result.address.zipCode).toBe("88888-888");
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe("DDD");
    expect(result.items[0].price).toBe(59.9);
    expect(result.total).toBe(59.9);
    expect(result.createdAt).toEqual(expect.any(Date));
  });
});
