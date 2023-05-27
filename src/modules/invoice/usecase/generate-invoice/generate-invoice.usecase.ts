import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/invoice.product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseOutputDto,
  GenerateInvoiceUseCaseInputDto,
} from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {
  constructor(private readonly invoiceRepository: InvoiceGateway) {}

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      document: input.document,
      address: new Address(
        input.street,
        input.complement,
        input.number,
        input.city,
        input.state,
        input.zipCode
      ),
      items: input.items.map((item) => {
        return new Product({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        });
      }),
    };

    const client = new Invoice(props);
    const invoice = await this.invoiceRepository.generate(client);

    return {
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.street,
      number: invoice.number,
      complement: invoice.complement,
      city: invoice.city,
      state: invoice.state,
      zipCode: invoice.zipCode,
      items: invoice.items,
      total: client.total(),
    };
  }
}
