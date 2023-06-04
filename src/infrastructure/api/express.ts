// @ts-ignore
import xss from "xss-clean";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";
import express, { Express, RequestHandler } from "express";
import { errorLogger, errorResponder } from "./middlewares/error.handlers";
import {
  clientsRoute,
  productsRoute,
  invoiceRoute,
  checkouteRoute,
} from "./routes";

import "../database/sequelize.postgres";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schemas";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphqlHTTP } from "express-graphql";

export const app: Express = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Segurança aos Header Http
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(hpp());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    "Há muitas requisições para o mesmo IP, por favor tente novamente daqui uma hora!",
});

// rate limit
app.use("/", limiter);

// CORS
app.use(cors());

app.use("/products", productsRoute);
app.use("/clients", clientsRoute);
app.use("/invoice", invoiceRoute);
app.use("/checkout", checkouteRoute);

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }) as RequestHandler);

app.use(errorLogger);
app.use(errorResponder);
