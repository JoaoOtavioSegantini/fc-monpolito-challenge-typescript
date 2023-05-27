import Product from "../domain/invoice.product.entity";

export default interface ProductGateway {
  create(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
}
