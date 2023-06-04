import { DataTypes } from "sequelize";
import { Migration } from "../config/umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.createTable("invoice_products", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    invoice_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "invoices", key: "id" },
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
  await sequelize.dropTable("invoice_products");
};
