"use strict";
const faker = require("../../modules/@shared/domain/fixture/faker.cjs");
const _ = require("lodash");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let products = [];

    _.times(30, () => {
      const product = faker.createRandomProduct();
      products.push(product);
    });

    await queryInterface.bulkInsert("products", products);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
