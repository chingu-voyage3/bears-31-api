const chai = require('chai');
const request = require('supertest');
const app = require('../../src/index');

const expect = chai.expect;

describe('GET /', function() {
  it('should return a 200 status code', function() {
    return request(app)
      .get('/')
      .send()
      .expect(200);
  });
  it('should return "Hello world!"', function() {
    return request(app)
      .get('/')
      .send()
      .then(response => {
        expect(response.body).to.equal('Hello world!');
      });
  });
});
