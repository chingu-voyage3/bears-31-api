module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('meetings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'groups',
          key: 'id',
        },
      },
      title: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      details: {
        type: Sequelize.TEXT,
      },
      due: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('meetings'),
};
