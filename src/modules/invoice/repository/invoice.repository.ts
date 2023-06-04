import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import { AppError } from "../../../infrastructure/api/middlewares/error.handlers";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/invoice.product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";

import { InvoiceModel } from "./invoice.model";
import { ProductModel } from "./invoice.product.model";

export class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id: id },
      include: [{ model: ProductModel }],
    });

    if (!invoice) {
      throw new AppError(404, "Invoice not found");
    }

    let products: Product[] = [];

    invoice.items.forEach((model) => {
      const product = new Product({
        id: new Id(model.id),
        name: model.name,
        price: model.price,
        invoiceId: model.invoice_id,
      });

      products.push(product);
    });

    return new Invoice({
      id: new Id(id),
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.street,
        invoice.complement,
        invoice.number,
        invoice.city,
        invoice.state,
        invoice.zipCode
      ),

      items: products,
    });
  }
  async generate(invoice: Invoice): Promise<InvoiceModel> {
    const data = await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });

    const model = invoice.items.map((item) => ({
      id: new Id().id,
      name: item.name,
      invoice_id: data.id,
      price: item.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    data.items = await ProductModel.bulkCreate(model);

    return data;
  }
}
