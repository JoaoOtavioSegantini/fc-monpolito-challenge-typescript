import { Sequelize } from "sequelize-typescript";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ProductModel from "../../repository/product.model";
import ProductRepository from "../../repository/product.repository";
import FindProductUseCase from "./find-product.usecase";

describe("find a product integration test", () => {
  let sequelize: Sequelize;
  const now = new Date();
  jest.useFakeTimers().setSystemTime(now);

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

  it("should find a product", async () => {
    await ProductModel.create({
      id: new Id("1").id,
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(result.id).toBe("1");
    expect(result.name).toBe("Product 1");
    expect(result.description).toBe("Description 1");
    expect(result.salesPrice).toBe(100);
  });
});
