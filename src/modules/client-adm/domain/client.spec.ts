import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "./client.entity";

describe("Client adm unit tests", () => {
  it("should throw error when name is empty", () => {
    expect(() => {
      let _client = new Client({
        name: "",
        email: "johndoe@gmail.com",
        street: "a simple address",
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    }).toThrowError("client: Name is required");
  });

  it("should throw error when email is empty", () => {
    expect(() => {
      let _client = new Client({
        id: new Id("123"),
        name: "John Doe",
        email: "",
        street: "a simple address",
      });
    }).toThrowError("client: Email is required");
  });

  it("should throw error when name name and email are empty", () => {
    expect(() => {
      let _client = new Client({
        id: new Id("123"),
        name: "",
        email: "",
        street: "a simple address",
      });
    }).toThrowError("client: Name is required,client: Email is required");
  });
  it("should throw error when email is not valid", () => {
    expect(() => {
      let _client = new Client({
        id: new Id("123"),
        name: "John Doe",
        email: "simpleemail",
        street: "a simple address",
      });
    }).toThrowError("client: Email is not valid");
  });
  it("should change name", () => {
    // Arrange
    const client = new Client({
      id: new Id("123"),
      name: "John",
      email: "johndoe@gmail.com",
      street: "a simple address",
    });

    // Act
    client.changeName("Jane");
    client.changeEmail("changed");

    // Assert
    expect(client.name).toBe("Jane");
    expect(client.email).toBe("changed");
  });
});
