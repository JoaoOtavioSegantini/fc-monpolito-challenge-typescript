import PlaceOrderFacadeFactory from "../factory/place-order.facade.factory";
import { PlaceOrderInputDto } from "../usecase/place-order/place-order.dto";

const facade = PlaceOrderFacadeFactory.create();

const checkoutResolver = {
  Mutation: {
    placeOrder(_: any, input: PlaceOrderInputDto) {
      return facade.create(input);
    },
  },
};

export default checkoutResolver;
