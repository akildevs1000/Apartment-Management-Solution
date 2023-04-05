'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      photo: {
        type: Sequelize.STRING,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      apartment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_master: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};