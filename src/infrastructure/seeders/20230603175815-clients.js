"use strict";
const faker = require("../../modules/@shared/domain/fixture/faker.cjs");
const _ = require("lodash");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let clients = [];

    _.times(10, () => {
      const client = faker.createRandomUser();
      clients.push(client);
    });

    await queryInterface.bulkInsert("clients", clients);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("clients", null, {});
  },
};
