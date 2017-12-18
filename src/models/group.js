module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: { type: DataTypes.STRING, allowNull: false },
  });

  Group.associate = (models) => {
    Group.belongsToMany(models.User, { through: models.UserGroup });
    Group.hasMany(models.UserGroup, { foreignKey: 'group_id', as: 'Members' });
    Group.hasMany(models.Invitation, { foreignKey: 'group_id' });
    Group.hasMany(models.Meeting, { foreignKey: 'group_id' });
  };
  return Group;
};
