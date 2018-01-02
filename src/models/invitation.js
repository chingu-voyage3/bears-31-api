const bookshelf = require('../bookshelf');
const { Group } = require('./group');

const Invitation = bookshelf.Model.extend({
  tableName: 'invitations',
  hasTimestamps: true,

  group() {
    return this.belongsTo(Group);
  },
}, {
  byEmail(email) {
    return this.forge().query({ where: { email } }).fetch();
  },
});

const Invitations = bookshelf.Collection.extend({
  model: Invitation,
});

module.exports.Invitation = bookshelf.model('Invitation', Invitation);
module.exports.Invitations = bookshelf.model('Invitations', Invitations);
