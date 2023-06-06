import { Sequelize } from "sequelize-typescript";
import TransactionRepostiory from "../../repository/transaction.repository";
import ProcessPaymentUseCase from "./process-payment.usecase";
import TransactionModel from "../../repository/transaction.model";

describe("Process payment usecase unit test", () => {
  let sequelize: Sequelize;
  const now = new Date();
  jest.useFakeTimers().setSystemTime(now);

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should approve a transaction", async () => {
    const paymentRepository = new TransactionRepostiory();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 100,
    };

    const result = await usecase.execute(input);

    expect(result.transactionId).toBeDefined();
    expect(result.status).toBe("approved");
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toStrictEqual(now);
    expect(result.updatedAt).toStrictEqual(now);
  });

  it("should decline a transaction", async () => {
    const paymentRepository = new TransactionRepostiory();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 50,
    };

    const result = await usecase.execute(input);

    expect(result.transactionId).toBeDefined();
    expect(result.status).toBe("declined");
    expect(result.amount).toBe(50);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toStrictEqual(now);
    expect(result.updatedAt).toStrictEqual(now);
  });
});
