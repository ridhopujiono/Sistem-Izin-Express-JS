'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const fs = require('fs');
    const path = require('path');
    let json_data = fs.readFileSync(path.resolve(__dirname, '../config/user.json'));
    json_data = JSON.parse(json_data);
    await queryInterface.bulkInsert('users', json_data.name, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
