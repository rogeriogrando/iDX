/* global describe, it, server, before, expect */

const factory = require('../../../../test-utils/factory.girl');

const ENDPOINT = '/vw_cardapio/cliente';

describe(`Routes admin ${ENDPOINT}`, () => {
  let token = null;
  before((done) => {
    factory.getTokenCliente(server)
    .then((context) => {
      token = context.token;
      done();
    });
  });
  describe(`GET ${ENDPOINT}`, () => {
    it('1 vw_cardapio GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/1`,
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
    it('2 vw_cardapio GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/1/1`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        console.log(response.result);
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });
  describe(`GET ${ENDPOINT}`, () => {
    it('3 Cardapio Prato GET returns 404 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/1/5`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        console.log(response.result);
        expect(response.statusCode).to.equals(404);
        done();
      });
    });
  });
});
