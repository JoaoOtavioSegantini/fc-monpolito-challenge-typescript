import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../../src/modules/client-adm/repository/client.model";
import { InvoiceModel } from "../../../src/modules/invoice/repository/invoice.model";
import TransactionModel from "../../../src/modules/payment/repository/transaction.model";
import ProductModel from "../../../src/modules/store-catalog/repository/product.model";
import { ProductModel as ProductAdmModel } from "../../../src/modules/product-adm/repository/product.model";
import { ProductModel as InvoiceProductModel } from "../../../src/modules/invoice/repository/invoice.product.model";
import { CheckoutModel } from "../../../src/modules/checkout/repository/checkout.model";

dotenv.config();

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASS || "123456",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DATABASE || "fc-challenge",
    logging: false,
  });
  sequelize.addModels([
    CheckoutModel,
    ClientModel,
    InvoiceModel,
    TransactionModel,
    InvoiceProductModel,
    ProductAdmModel,
    ProductModel,
  ]);

  await sequelize.sync();
}

setupDb().catch((err) => Promise.reject(err));
