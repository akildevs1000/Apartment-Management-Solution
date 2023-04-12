'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('secret', 10);

    return queryInterface.bulkInsert('users', [
      {
        username: 'Master',
        email: 'master@erp.com',
        password: hashedPassword,
        mobile: "03108559858",
        role_id: 0,
        apartment_id: 0,
        is_master : true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
