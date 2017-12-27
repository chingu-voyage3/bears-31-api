'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_meetings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      meeting_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'meetings',
          key: 'id',
        },
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Undisclosed', 'Going', 'Maybe', 'Not Going'],
        defaultValue: 'Undisclosed',
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_meetings');
  },
};
