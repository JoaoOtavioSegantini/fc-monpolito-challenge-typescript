import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const inputProduct = {
  id: "1",
  name: "Product x",
  price: 85,
};

const inputProduct2 = {
  id: "2",
  name: "Product y",
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
const MockRepository = () => {
  return {
    generate: jest.fn().mockReturnValue(Promise.resolve(inputInvoice)),
    find: jest.fn(),
  };
};

describe("Generate Invoice use case unit test", () => {
  it("should generate invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);

    const result = await usecase.execute(inputInvoice);

    expect(invoiceRepository.generate).toHaveBeenCalled();

    expect(result).toStrictEqual({
      id: inputInvoice.id,
      name: inputInvoice.name,
      document: inputInvoice.document,
      street: inputInvoice.street,
      number: inputInvoice.number,
      complement: inputInvoice.complement,
      city: inputInvoice.city,
      state: inputInvoice.state,
      zipCode: inputInvoice.zipCode,
      items: inputInvoice.items,
      total: 117,
    });
  });
});
