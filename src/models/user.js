module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    indexes: [
      {
        unique: true,
        fields: ['username'],
      },
      {
        unique: true,
        fields: ['email'],
      },
    ],
  });

  User.associate = (models) => {
    User.belongsToMany(models.Group, { through: models.UserGroup });
    User.belongsToMany(models.Meeting, { through: models.UserMeeting });
    User.hasMany(models.UserGroup, { foreignKey: 'group_id' });
    User.hasMany(models.UserMeeting, { foreignKey: 'meeting_id' });
  };
  return User;
};
