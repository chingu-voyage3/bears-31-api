module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'group',
        key: 'id',
      },
    },
    is_admin: DataTypes.BOOLEAN,
  });

  UserGroup.associate = (models) => {
    UserGroup.belongsTo(models.User);
    UserGroup.belongsTo(models.Group);
  };
  return UserGroup;
};
