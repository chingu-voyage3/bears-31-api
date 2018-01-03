const bcrypt = require('bcrypt');
const bookshelf = require('../bookshelf');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  groups() {
    return this.belongsToMany('Group', 'users_groups');
  },

  meetings() {
    return this.belongsToMany('Meeting', 'users_meetings');
  },

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

  findAll(filter, options) {
    return this.forge().where(filter).fetchAll(options);
  },
});

const Users = bookshelf.Collection.extend({
  model: User,
});

module.exports.User = bookshelf.model('User', User);
module.exports.Users = bookshelf.model('Users', Users);
