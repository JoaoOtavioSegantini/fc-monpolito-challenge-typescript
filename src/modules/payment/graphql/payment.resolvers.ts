import PaymentFacadeFactory from "../factory/payment.facade.factory";
import { ProcessPaymentInputDto } from "../usecase/process-payment/process-payment.dto";

const facade = PaymentFacadeFactory.create();

const paymentResolvers = {
  Mutation: {
    processPayment(_: any, input: ProcessPaymentInputDto) {
      return facade.process(input);
    },
  },
};

export default paymentResolvers;
