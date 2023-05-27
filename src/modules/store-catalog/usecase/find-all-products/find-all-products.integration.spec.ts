import { Sequelize } from "sequelize-typescript";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ProductRepository from "../../repository/product.repository";
import FindAllProductsUsecase from "./find-all-products.usecase";
import ProductModel from "../../repository/product.model";

describe("find all products integration test", () => {
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

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindAllProductsUsecase(productRepository);

    await ProductModel.create({
      id: new Id("1").id,
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    await ProductModel.create({
      id: new Id("2").id,
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });

    const result = await usecase.execute();

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe("1");
    expect(result.products[0].name).toBe("Product 1");
    expect(result.products[0].description).toBe("Description 1");
    expect(result.products[0].salesPrice).toBe(100);
    expect(result.products[1].id).toBe("2");
    expect(result.products[1].name).toBe("Product 2");
    expect(result.products[1].description).toBe("Description 2");
    expect(result.products[1].salesPrice).toBe(200);
  });
});
