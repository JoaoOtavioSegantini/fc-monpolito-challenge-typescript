import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import PlaceOrderFacadeFactory from "../../../modules/checkout/factory/place-order.facade.factory";

export const checkouteRoute = express.Router();

checkouteRoute.post("/", (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const facade = PlaceOrderFacadeFactory.create();
  try {
    const checkoutDto = {
      clientId: req.body.clientId,
      products: req.body.products,
    };
    const output = await facade.create(checkoutDto);
    res.send(output);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);
