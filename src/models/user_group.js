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
        references: {
          model: 'users',
          key: 'id',
        },
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

      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
