import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/';

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
