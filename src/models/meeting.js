module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('Meeting', {
    group_id: { type: DataTypes.INTEGER, references: 'groups', key: 'id' },
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    details: DataTypes.TEXT,
    due: DataTypes.DATE,
  });
  Meeting.associate = (models) => {
    Meeting.belongsToMany(models.User, { through: models.UserMeeting });
    Meeting.hasMany(models.UserMeeting, { foreignKey: 'meeting_id' });
    Meeting.belongsTo(models.Group, { foreignKey: 'group_id', onDelete: 'CASCADE' });
  };
  return Meeting;
};
