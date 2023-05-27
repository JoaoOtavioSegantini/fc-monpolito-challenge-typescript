import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/invoice.product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./invoice.product.model";

export default class ProductRepository implements ProductGateway {
  async create(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      price: product.price,
    });
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      price: product.price,
    });
  }
}
