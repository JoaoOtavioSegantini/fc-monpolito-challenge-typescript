import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "./invoice.entity";

describe("Invoice unit tests", () => {
  it("should throw error when name is empty", () => {
    expect(() => {
      new Invoice({
        name: "",
        document: "xyxa",
        address: new Address(
          "a simple street",
          "a simple complement",
          "123",
          "Faker city",
          "Faker state",
          "Faker zipcode"
        ),
        items: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    }).toThrowError("invoice: Name is required");
  });

  it("should throw error when name name and email are empty", () => {
    expect(() => {
      new Invoice({
        id: new Id("123"),
        name: "",
        document: "",
        address: new Address(
          "a simple street",
          "a simple complement",
          "123",
          "Faker city",
          "Faker state",
          "Faker zipcode"
        ),
        items: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    }).toThrowError("invoice: Name is required");
  });
  it("should throw error when email is not valid", () => {
    expect(() => {
      new Invoice({
        id: new Id("123"),
        name: "John Doe",
        document: "xyxa",
        address: "" as unknown as any,
        items: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    }).toThrowError(/invoice: address must be a `object`/g);
  });
});
