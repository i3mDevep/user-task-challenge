'use strict';
// const {
//   EncryptService,
// } = require('../../../context/shared/domain/encrypt.service');
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    // const encryptService = new EncryptService();
    const salt = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash('password', salt);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '0d822dce-88d5-4f8a-823c-eee72a6c18f0',
          username: 'John Doe Admin',
          email: 'admin@seed.com',
          password: hashedValue,
          roles: JSON.stringify(['admin']),
          createdAt: '2024-09-13 23:51:16',
          updatedAt: '2024-09-13 23:51:16'
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      'Users',
      { id: '0d822dce-88d5-4f8a-823c-eee72a6c18f0' },
      {}
    );
  },
};
