const bcrypt = require('bcrypt');
const bookshelf = require('../bookshelf');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  verifyPassword(password) {
    return bcrypt.compareSync(password, this.get('password'));
  },
}, {
  create(data, options) {
    return this.forge(data).save(null, options);
  },

  byUsername(username) {
    return this.forge().query({ where: { username } }).fetch();
  },

  byEmail(email) {
    return this.forge().query({ where: { email } }).fetch();
  },
});

const Users = bookshelf.Collection.extend({
  model: User,
});

module.exports = {
  User,
  Users,
};

/*
'use strict';
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
        type: DataTypes.STRING,
        allowNull: false,
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
*/
