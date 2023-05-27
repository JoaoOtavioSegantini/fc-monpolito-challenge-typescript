import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../repository/product.repository";
import AddProductUseCase from "./add-product.usecase";
import { ProductModel } from "../../repository/product.model";

describe("Add Product integration test", () => {
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

  it("should add a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new AddProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    const result = await usecase.execute(input);

    expect(result.id).toBeDefined;
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  });
});
