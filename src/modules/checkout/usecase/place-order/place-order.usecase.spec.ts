import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUsecase from "./place-order.usecase";

describe("PlaceOrder usecase unit test", () => {
  describe("validateProduct method", () => {
    // @ts-expect-error
    const placaOrderUsecase = new PlaceOrderUsecase();
    it("should throw an error if no products selected", async () => {
      const input: PlaceOrderInputDto = { clientId: "0", products: [] };
      await expect(
        placaOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("No products selected"));
    });
    it("should throw an error when product is out of stock", async () => {
      const mockProductFacade = {
        checkStock: jest.fn(({ productId }: { productId: string }) =>
          Promise.resolve({
            productId,
            stock: productId === "1" ? 0 : 1,
          })
        ),
      };

      // @ts-expect-error
      const placaOrderUsecase = new PlaceOrderUsecase();
      //@ts-expect-error - force client set facade
      placaOrderUsecase["_productFacade"] = mockProductFacade;
      let input: PlaceOrderInputDto = {
        clientId: "0",
        products: [{ productId: "1" }],
      };

      await expect(
        placaOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not avaliable in stock"));

      input = {
        clientId: "0",
        products: [{ productId: "1" }, { productId: "0" }],
      };

      await expect(
        placaOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not avaliable in stock"));
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(2);

      input = {
        clientId: "0",
        products: [{ productId: "1" }, { productId: "0" }, { productId: "2" }],
      };

      await expect(
        placaOrderUsecase["validateProducts"](input)
      ).rejects.toThrow(new Error("Product 1 is not avaliable in stock"));
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);
    });
  });
  describe("getProducts method", () => {
    const mockDate = new Date();
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    // @ts-expect-error
    const placaOrderUsecase = new PlaceOrderUsecase();

    it("should throw error when product not found", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      //@ts-expect-error
      placaOrderUsecase["_catalogFacade"] = mockCatalogFacade;

      await expect(placaOrderUsecase["getProduct"]("0")).rejects.toThrow(
        new Error("Product not found")
      );
    });
    it("should return a product", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue({
          id: "0",
          name: "Product 0",
          description: "Product 0 description",
          salesPrice: 0,
        }),
      };

      //@ts-expect-error
      placaOrderUsecase["_catalogFacade"] = mockCatalogFacade;

      await expect(placaOrderUsecase["getProduct"]("0")).resolves.toEqual(
        new Product({
          id: new Id("0"),
          name: "Product 0",
          description: "Product 0 description",
          salesPrice: 0,
        })
      );
      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
    });
  });
  describe("execute method", () => {
    it("should throw an error when client not found", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      // @ts-expect-error
      const placaOrderUsecase = new PlaceOrderUsecase();
      //@ts-expect-error - force client set facade
      placaOrderUsecase["_clientFacade"] = mockClientFacade;
      const input: PlaceOrderInputDto = { clientId: "0", products: [] };

      await expect(placaOrderUsecase.execute(input)).rejects.toThrow(
        new Error("Client not found")
      );
    });
    it("should throw an error when products are not valid", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
      };

      // @ts-expect-error
      const placaOrderUsecase = new PlaceOrderUsecase();
      //@ts-expect-error - force client set facade
      placaOrderUsecase["_clientFacade"] = mockClientFacade;

      const mockValidateProducts = jest
        //@ts-expect-error
        .spyOn(placaOrderUsecase, "validateProducts")
        .mockRejectedValue(new Error("No products selected") as never);

      const input: PlaceOrderInputDto = { clientId: "1", products: [] };
      await expect(placaOrderUsecase.execute(input)).rejects.toThrow(
        new Error("No products selected")
      );
      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
    });

    describe("place an order", () => {
      const clientProps = {
        id: "1c",
        name: "a simple facade",
        document: "x",
        street: "a simple street",
        number: "123",
        complement: "a simple complement",
        city: "Faker city",
        state: "Faker state",
        zipCode: "Faker zipcode",
      };

      const mockClientFacade = {
        add: jest.fn().mockResolvedValue(clientProps),
        find: jest.fn().mockResolvedValue(clientProps),
      };

      const mockPaymentFacade = {
        process: jest.fn(),
      };

      const mockCheckoutRepository = {
        addOrder: jest.fn(),
        findOrder: jest.fn(),
      };

      const mockInvoiceFacade = {
        generate: jest.fn().mockResolvedValue({ id: "1" }),
        find: jest.fn().mockResolvedValue({ id: "1" }),
      };

      const placaOrderUsecase = new PlaceOrderUsecase(
        mockClientFacade,
        null,
        null,
        mockCheckoutRepository,
        mockInvoiceFacade,
        mockPaymentFacade
      );

      const products = {
        "1": new Product({
          id: new Id("1"),
          name: "Product 1",
          description: "Product 1 description",
          salesPrice: 100,
        }),
        "2": new Product({
          id: new Id("2"),
          name: "Product 2",
          description: "Product 2 description",
          salesPrice: 50,
        }),
      };

      const mockValidateProducts = jest
        // @ts-expect-error
        .spyOn(placaOrderUsecase, "validateProducts")
        // @ts-expect-error
        .mockResolvedValue(null);

      const mockGetProduct = jest
        // @ts-expect-error
        .spyOn(placaOrderUsecase, "getProduct")
        // @ts-expect-error
        .mockImplementation((productId: keyof typeof products) => {
          return products[productId];
        });

      it("should not be approved", async () => {
        mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
          transactionId: "1l",
          orderId: "1d",
          status: "error",
          amount: 100,
          updatedAt: new Date(),
          createdAt: new Date(),
        });

        const input: PlaceOrderInputDto = {
          clientId: "1l",
          products: [{ productId: "1" }, { productId: "2" }],
        };

        let output = await placaOrderUsecase.execute(input);
        expect(output.invoiceId).toBeNull();
        expect(output.total).toBe(150);
        expect(output.products).toStrictEqual([
          { productId: "1" },
          { productId: "2" },
        ]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1l" });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockValidateProducts).toHaveBeenCalledWith(input);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total,
        });
        expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0);
      });
      it("should be approved", async () => {
        mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
          transactionId: "1l",
          orderId: "1d",
          status: "approved",
          amount: 100,
          updatedAt: new Date(),
          createdAt: new Date(),
        });

        const input: PlaceOrderInputDto = {
          clientId: "1c",
          products: [{ productId: "1" }, { productId: "2" }],
        };

        let output = await placaOrderUsecase.execute(input);
        expect(output.invoiceId).toBe("1");
        expect(output.total).toBe(150);
        expect(output.products).toStrictEqual([
          { productId: "1" },
          { productId: "2" },
        ]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total,
        });
        expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1);
        expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
          name: clientProps.name,
          document: clientProps.document,
          city: clientProps.city,
          complement: clientProps.complement,
          number: clientProps.number,
          state: clientProps.state,
          street: clientProps.state,
          zipCode: clientProps.zipCode,
          items: [
            {
              id: products["1"].id.id,
              name: products["1"].name,
              price: products["1"].salesPrice,
            },
            {
              id: products["2"].id.id,
              name: products["2"].name,
              price: products["2"].salesPrice,
            },
          ],
        });
      });
    });
  });
});
