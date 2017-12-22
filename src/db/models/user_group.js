'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define(
    'UserGroup',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      is_admin: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
      },
    },
    {
      underscored: true,
      classMethods: {
        associate(models) {
          UserGroup.belongsTo(models.User);
          UserGroup.belongsTo(models.Group);
        },
      },
    },
  );
  return UserGroup;
};
