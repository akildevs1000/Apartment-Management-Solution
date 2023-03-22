"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkDelete("flats", null, {});
    let flats = [];
    for (let floor = 1; floor < 11; floor++) {
      for (let flat = 1; flat < 6; flat++) {
        let iteration = {
          floor_id: floor,
          flat_number: (floor * 100) + flat,
        };
        iteration.createdAt = new Date();
        iteration.updatedAt = new Date();
        flats.push(iteration);
      }
    }
    return queryInterface.bulkInsert("flats", flats);

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
    return queryInterface.bulkDelete("flats", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
