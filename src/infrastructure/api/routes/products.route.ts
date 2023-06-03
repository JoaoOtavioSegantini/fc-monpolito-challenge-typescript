import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

export const productsRoute = express.Router();

productsRoute.post("/", (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const facade = ProductAdmFacadeFactory.create();
  try {
    const productDto = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      salesPrice: req.body.salesPrice,
      stock: req.body.stock,
    };
    const output = await facade.addProduct(productDto);
    res.send(output);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);
