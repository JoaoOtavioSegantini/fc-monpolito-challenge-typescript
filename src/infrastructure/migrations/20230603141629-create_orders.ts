import { DataTypes } from "sequelize";
import { Migration } from "../config/umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.createTable("orders", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.UUID,
      references: { model: "clients", key: "id" },
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.dropTable("orders");
};
