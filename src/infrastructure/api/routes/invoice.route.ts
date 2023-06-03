import express, { Request, RequestHandler, Response } from "express";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", (async (req: Request, res: Response, next) => {
  const facade = InvoiceFacadeFactory.create();
  const input = {
    id: req.params.id,
  };
  try {
    const output = await facade.find(input);
    res.send(output);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);
