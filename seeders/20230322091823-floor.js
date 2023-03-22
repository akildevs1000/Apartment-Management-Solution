"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkDelete("floors", null, {});

    let floors = [];

    for (let floor = 1; floor < 11; floor++) {
      let iteration = {};

      if (floor === 1) {
        iteration.floor_number = `${floor}st Floor`;
      } else if (floor === 2) {
        iteration.floor_number = `${floor}nd Floor`;
      } else if (floor === 3) {
        iteration.floor_number = `${floor}rd Floor`;
      } else {
        iteration.floor_number = `${floor}th Floor`;
      }

      iteration.createdAt = new Date();
      iteration.updatedAt = new Date();
      floors.push(iteration);
    }

    return queryInterface.bulkInsert("floors", floors);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("floors", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
