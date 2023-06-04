import { DataTypes } from "sequelize";
import { Migration } from "../config/umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.createTable("products", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchasePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    salesPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invoice_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "invoices", key: "id" },
    },
    ordersId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "orders", key: "id" },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.dropTable("products");
};
