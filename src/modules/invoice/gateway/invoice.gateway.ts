import Invoice from "../domain/invoice.entity";
import { InvoiceModel } from "../repository/invoice.model";

export default interface InvoiceGateway {
  find(id: string): Promise<Invoice>;
  generate(invoice: Invoice): Promise<InvoiceModel>;
}
