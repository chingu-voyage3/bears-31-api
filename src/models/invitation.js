module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define('Invitation', {
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'group',
        key: 'id',
      },
    },
    user_email: DataTypes.STRING,
  });
  Invitation.associate = (models) => {
    Invitation.belongsTo(models.Meeting, { foreignKey: 'group_id', onDelete: 'CASCADE' });
  };

  return Invitation;
};
