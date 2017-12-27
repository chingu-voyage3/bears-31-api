'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMeeting = sequelize.define(
    'UserMeeting',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      meeting_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'meetings',
          key: 'id',
        },
        allowNull: false,
      },

      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM,
        values: ['Undisclosed', 'Going', 'Maybe', 'Not Going'],
        defaultValue: 'Undisclosed',
        allowNull: false,
      },
    },
    {
      underscored: true,
      classMethods: {
        associate(models) {
          UserMeeting.belongsTo(models.User);
          UserMeeting.belongsTo(models.Meeting);
        },
      },
    },
  );
  return UserMeeting;
};
