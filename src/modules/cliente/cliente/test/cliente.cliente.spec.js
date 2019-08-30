/* global describe, it, server, before, expect */

const factory = require('../../../../test-utils/factory.girl');

const ENDPOINT = '/cliente/cliente';

describe(`Routes cliente ${ENDPOINT}`, () => {
  let token = null;
  before((done) => {
    factory.getTokenCliente(server)
    .then((context) => {
      token = context.token;
      done();
    });
  });
  describe(`POST ${ENDPOINT}/login`, () => {
    it('returns 200 HTTP status code', (done) => {
      done();
    });
  });
  describe(`GET ${ENDPOINT}`, () => {
    it('Cliente GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: ENDPOINT,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        // console.log(response);
        expect(response.result).to.exist();
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });
  describe(`GET ${ENDPOINT}`, () => {
    it('cliente GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/3`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        // console.log(response.result);
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });
  describe(`PUT ${ENDPOINT}`, () => {
    it('Cliente PUT returns 200 HTTP status code', (done) => {
      let payload = {
        telefone: '555555555'
      };
      const options = {
        method: 'PUT',
        url: `${ENDPOINT}/2`,
        headers: {'Authorization': `Bearer ${token}`},
        payload: payload
      };
      server.inject(options, (response) => {
        // console.log(response.result);
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });
});
