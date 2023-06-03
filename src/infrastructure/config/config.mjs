import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE || "database_development",
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      charset: "utf8",
    },
    define: {
      timestamps: false,
    },
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASS,
    database: process.env.DB_NAME || "database_test",
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      charset: "utf8",
    },
    define: {
      timestamps: false,
    },
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASS,
    database: process.env.DB_NAME || "database_production",
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      charset: "utf8",
      multipleStatements: true,
    },
    logging: false,
    define: {
      timestamps: false,
    },
  },
};
