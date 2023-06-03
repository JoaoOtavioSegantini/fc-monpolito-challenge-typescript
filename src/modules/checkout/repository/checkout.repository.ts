import Id from "../../@shared/domain/value-object/id.value-object";
import { AppError } from "../../../infrastructure/api/middlewares/error.handlers";
import { ClientModel } from "../../client-adm/repository/client.model";
import ProductModel from "../../store-catalog/repository/product.model";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { CheckoutModel } from "./checkout.model";

export default class OrderRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await CheckoutModel.create(
      {
        id: order.id.id,
        status: order.status,
        clientId: order.client.id.id,
      },
      { include: [{ model: ClientModel }] }
    );
  }
  async findOrder(id: string): Promise<Order> {
    const order = await CheckoutModel.findOne({
      where: { id },
      include: [{ model: ClientModel }, { model: ProductModel }],
    });

    if (!order) {
      throw new AppError(404, "Order not found");
    }

    return new Order({
      id: new Id(order.id),
      client: new Client({
        id: new Id(order.client.id),
        name: order.client.name,
        address: null,
        email: order.client.email,
        city: order.client.city,
        complement: order.client.complement,
        number: order.client.number,
        state: order.client.state,
        street: order.client.street,
        zipCode: order.client.zipCode,
      }),
      products: order.products.map((product) => {
        return new Product({
          id: new Id(product.id),
          description: product.description,
          name: product.name,
          salesPrice: product.salesPrice,
        });
      }),
    });
  }
}
