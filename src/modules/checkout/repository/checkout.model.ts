import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ClientModel } from "../../client-adm/repository/client.model";
import ProductModel from "../../store-catalog/repository/product.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export class CheckoutModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @BelongsTo(() => ClientModel)
  declare client: ClientModel;

  @ForeignKey(() => ClientModel)
  @Column({ field: "client_id" })
  declare clientId: string;

  @HasMany(() => ProductModel)
  declare products: ProductModel[];

  @Column({ allowNull: false })
  declare status?: string;
}

// @Table({ tableName: "order_products" })
// export class OrdersProducts extends Model {
//   @BelongsTo(() => CheckoutModel)
//   declare order: CheckoutModel;

//   @PrimaryKey
//   @ForeignKey(() => CheckoutModel)
//   @Column({ field: "checkout_id" })
//   declare orderId: string;

//   @BelongsTo(() => ProductModel)
//   declare product: ProductModel;

//   @ForeignKey(() => ProductModel)
//   @Column({ field: "product_id" })
//   declare productId: string;
// }

// @BelongsToMany(() => ProductModel, {
//   through: { model: () => OrdersProducts },
// })
// declare products: ProductModel[];

// @HasMany(() => OrdersProducts, {
//   onDelete: "CASCADE",
// })
// declare orders: OrdersProducts[];
