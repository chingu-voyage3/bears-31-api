module.exports = (sequelize, DataTypes) => {
  const UserMeeting = sequelize.define('UserMeeting', {
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: 'user', key: 'id' },
    },
    meeting_id: {
      type: DataTypes.INTEGER,
      references: { model: 'meeting', key: 'id' },
    },
    status: DataTypes.STRING,
  });
  UserMeeting.associate = (models) => {
    UserMeeting.belongsTo(models.User);
    UserMeeting.belongsTo(models.Meeting);
  };
  return UserMeeting;
};
