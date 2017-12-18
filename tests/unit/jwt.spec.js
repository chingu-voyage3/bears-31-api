import { expect } from 'chai';
import { encodeToken, decodeToken } from '../../src/utils/jwt';

describe('The JWT module works', () => {
  it('should encode a token without errors', () => {
    const payload = {
      username: 'foo'
    };
    const token = encodeToken(payload);
    const decodedToken = decodeToken(token);
    expect(decodedToken.username).to.equal(payload.username);
  });
});
