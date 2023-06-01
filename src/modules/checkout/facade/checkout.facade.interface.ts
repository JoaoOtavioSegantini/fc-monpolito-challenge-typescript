export interface GenerateOrderFacadeInputDto {
  clientId: string;
  products: {
    productId: string;
  }[];
}

export interface GenerateOrderFacadeOutputDto {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string;
  }[];
}

export default interface CheckoutFacadeInterface {
  create(
    input: GenerateOrderFacadeInputDto
  ): Promise<GenerateOrderFacadeOutputDto>;
}
