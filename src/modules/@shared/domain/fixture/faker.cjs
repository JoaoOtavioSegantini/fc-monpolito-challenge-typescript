const { faker } = require("@faker-js/faker");

function createRandomUser() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    complement: faker.location.ordinalDirection(),
    number: faker.location.countryCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    street: faker.location.zipCode(),
    document: faker.word.sample(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };
}

function createRandomProduct() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    purchasePrice: Number(faker.commerce.price()),
    salesPrice: Number(faker.commerce.price()),
    stock: faker.number.int({ max: 150 }),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };
}

module.exports = { createRandomProduct, createRandomUser };
