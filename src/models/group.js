const bookshelf = require('../bookshelf');

const Group = bookshelf.Model.extend({
  tableName: 'groups',
  hasTimestamps: true,
}, {
  create(data, options) {
    return this.forge(data).save(null, options);
  },
});

const Groups = bookshelf.Collection.extend({
  model: Group,
});

module.exports = {
  Group,
  Groups,
};

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
