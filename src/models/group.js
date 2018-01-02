const bookshelf = require('../bookshelf');

const Group = bookshelf.Model.extend({
  tableName: 'groups',
  hasTimestamps: true,

  users() {
    return this.belongsToMany('User', 'users_groups');
  },
}, {
  create(data, options) {
    return this.forge(data).save(null, options);
  },

  byID(id) {
    return this.forge().query({ where: { id } }).fetch();
  },
});

const Groups = bookshelf.Collection.extend({
  model: Group,
});

module.exports.Group = bookshelf.model('Group', Group);
module.exports.Groups = bookshelf.model('Groups', Groups);

/*
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'Group',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      classMethods: {
        associate(models) {
          Group.belongsToMany(models.User, { through: models.UserGroup });
          Group.hasMany(models.UserGroup);
          Group.hasMany(models.Invitation);
          Group.hasMany(models.Meeting);
        },
      },
    },
  );
  return Group;
};
*/
