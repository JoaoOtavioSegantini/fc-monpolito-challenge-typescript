import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../repository/product.repository";
import AddProductUseCase from "../add-product/add-product.usecase";
import CheckStockUseCase from "./check-stock.usecase";
import { ProductModel } from "../../repository/product.model";

const product = {
  id: "1",
  name: "Product",
  description: "Product description",
  purchasePrice: 100,
  stock: 10,
};

describe("CheckStock integration test", () => {
  let sequelize: Sequelize;
  const now = new Date();
  jest.useFakeTimers("modern").setSystemTime(now);

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should get stock of a product", async () => {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);

    await addProductUseCase.execute(product);
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const input = {
      productId: "1",
    };

    const result = await checkStockUseCase.execute(input);

    expect(result.productId).toBe("1");
    expect(result.stock).toBe(10);
  });
});
