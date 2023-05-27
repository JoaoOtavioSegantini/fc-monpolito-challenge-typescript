import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/invoice.product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";

import { InvoiceModel } from "./invoice.model";

export class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id: id },
      include: [{ association: "items" }],
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    let products: Product[] = [];

    invoice.items.forEach((model) => {
      const product = new Product({
        id: new Id(model.id),
        name: model.name,
        price: model.price,
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
    return await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        items: invoice.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
      },
      {
        include: [{ association: "items" }],
      }
    );
  }
}
