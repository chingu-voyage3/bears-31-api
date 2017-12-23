'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define(
    'Meeting',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      details: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      due: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      group_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'groups',
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      underscored: true,
      classMethods: {
        associate(models) {
          Meeting.belongsTo(models.Group);
          Meeting.belongsToMany(models.User, { through: models.UserGroup });
          Meeting.hasMany(models.UserMeeting);
        },
      },
    },
  );
  return Meeting;
};
