// @ts-ignore
import config from "../config/config.js";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../../src/modules/client-adm/repository/client.model";
import { InvoiceModel } from "../../../src/modules/invoice/repository/invoice.model";
import TransactionModel from "../../../src/modules/payment/repository/transaction.model";
import ProductModel from "../../../src/modules/store-catalog/repository/product.model";
import { ProductModel as ProductAdmModel } from "../../../src/modules/product-adm/repository/product.model";
import { ProductModel as InvoiceProductModel } from "../../../src/modules/invoice/repository/invoice.product.model";
import { CheckoutModel } from "../../../src/modules/checkout/repository/checkout.model";
import { setupMigrations } from "../config/umzug";

export let sequelize: Sequelize;

async function setupDb() {
  const env = process.env.NODE_ENV || "development";

  sequelize = new Sequelize(config[env]);

  sequelize.addModels([
    CheckoutModel,
    ClientModel,
    InvoiceModel,
    TransactionModel,
    InvoiceProductModel,
    ProductAdmModel,
    ProductModel,
  ]);

  setupMigrations(sequelize);
}

setupDb().catch((err) => Promise.reject(err));
