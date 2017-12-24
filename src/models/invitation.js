'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define(
    'Invitation',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      group_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'groups',
          key: 'id',
        },
      },

      user_email: DataTypes.STRING,
    },
    {
      underscored: true,
      classMethods: {
        associate(models) {
          Invitation.belongsTo(models.Group);
        },
      },
    },
  );
  return Invitation;
};
