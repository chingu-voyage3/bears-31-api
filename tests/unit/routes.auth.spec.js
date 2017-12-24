process.env.NODE_ENV = 'test';

const chai = require('chai');

const expect = chai.expect();

chai.use(require('chai-http'));

const server = require('../../src');
const models = require('../../src/db/models');

describe('routes:auth', () => {
  beforeEach(() => models.sequelize.sync({ force: true }));
  afterEach(() => models.sequelize.drop());

  describe('POST /users/register', () => {
    it('should register a new user', (done) => {
      chai
        .request(server)
        .post('/users/register')
        .send({
          username: 'foo',
          email: 'bar@foo.com.',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
