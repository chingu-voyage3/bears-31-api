module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      first_name: {
        type: DataTypes.STRING,
      },

      last_name: {
        type: DataTypes.STRING,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      classMethods: {
        associate(models) {
          User.belongsToMany(models.Group, { through: models.UserGroup });
          User.belongsToMany(models.Meeting, { through: models.UserMeeting });
          User.hasMany(models.UserGroup);
          User.hasMany(models.UserMeeting);
        },
      },
    },
    {
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
    },
  );
  return User;
};
