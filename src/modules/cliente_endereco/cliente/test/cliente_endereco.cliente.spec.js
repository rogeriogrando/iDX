/* global describe, it, server, before, expect */

const factory = require('../../../../test-utils/factory.girl');

const ENDPOINT = '/cliente_endereco/cliente';

describe(`Routes cliente_endereco ${ENDPOINT}`, () => {
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
      // console.log(token);
      done();
    });
  });
  describe(`GET ${ENDPOINT}`, () => {
    it('cliente_endereco 1 GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: ENDPOINT,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        // console.log(response.result);
        // console.log(response.result.rows);
        expect(response.result).to.exist();
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });
  describe(`GET ${ENDPOINT}`, () => {
    it('cliente_endereco 2 GET returns 200 HTTP status code', (done) => {
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
    it('cliente_endereco PUT returns 200 HTTP status code', (done) => {
      let payload = {
        cidade: 'Porto Feliz'
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
