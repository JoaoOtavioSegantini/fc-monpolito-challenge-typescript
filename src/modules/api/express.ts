import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../client-adm/repository/client.model";
import { InvoiceModel } from "../invoice/repository/invoice.model";
import TransactionModel from "../payment/repository/transaction.model";
import ProductModel from "../store-catalog/repository/product.model";
import { ProductModel as ProductAdmModel } from "../product-adm/repository/product.model";
import { ProductModel as InvoiceProductModel } from "../invoice/repository/invoice.product.model";

export const app: Express = express();
app.use(express.json());

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
    ClientModel,
    InvoiceModel,
    TransactionModel,
    ProductModel,
    ProductAdmModel,
    InvoiceProductModel,
  ]);
  if (process.env.NODE_ENV != "test") {
    await sequelize.sync();
  }
}
setupDb().catch((err) => Promise.reject(err));
