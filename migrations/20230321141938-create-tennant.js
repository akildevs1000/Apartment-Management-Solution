"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // tel
  // mobile
  // from
  // to
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tennants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      floor_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      flat_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      photo: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
      },
      tel: {
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      from: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      to: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tennants");
  },
};
