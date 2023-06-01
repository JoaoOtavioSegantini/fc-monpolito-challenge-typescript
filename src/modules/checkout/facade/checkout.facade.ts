import PlaceOrderUsecase from "../usecase/place-order/place-order.usecase";
import CheckoutFacadeInterface, {
  GenerateOrderFacadeInputDto,
  GenerateOrderFacadeOutputDto,
} from "./checkout.facade.interface";

export default class CheckoutFacade implements CheckoutFacadeInterface {
  constructor(private readonly placeOrderUseCase: PlaceOrderUsecase) {}

  async create(
    input: GenerateOrderFacadeInputDto
  ): Promise<GenerateOrderFacadeOutputDto> {
    return await this.placeOrderUseCase.execute(input);
  }
}
