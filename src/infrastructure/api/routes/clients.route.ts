import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";

export const clientsRoute = express.Router();

clientsRoute.post("/", (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const facade = ClientAdmFacadeFactory.create();
  try {
    const clientDto = {
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      city: req.body.city,
      complement: req.body.city,
      street: req.body.street,
      number: req.body.number,
      state: req.body.state,
      zipCode: req.body.zipCode,
    };
    const output = await facade.add(clientDto);
    res.send(output);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);
