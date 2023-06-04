import {
  FindInvoiceFacadeInputDto,
  GenerateInvoiceFacadeInputDto,
} from "../facade/invoice.facade.interface";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

const facade = InvoiceFacadeFactory.create();

const invoiceResolvers = {
  Mutation: {
    generateInvoice(_: any, input: GenerateInvoiceFacadeInputDto) {
      return facade.generate(input);
    },
  },
  Query: {
    findInvoiceByID(_: any, input: FindInvoiceFacadeInputDto) {
      return facade.find(input);
    },
  },
};

export default invoiceResolvers;
