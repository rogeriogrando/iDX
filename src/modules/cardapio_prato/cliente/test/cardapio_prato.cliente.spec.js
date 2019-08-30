/* global describe, it, server, before, expect */

const factory = require('../../../../test-utils/factory.girl');

const ENDPOINT = '/cardapio_prato/cliente';

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
    it('1 Cliente Cardapio Prato GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/1/1`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        console.log(response.result.descricao_prato);
        // console.log(response.result.rows);
        // expect(response.result).to.exist();
        // expect(response.result.count).to.equals(1);
        expect(response.result.descricao_prato).to.equals('Carne Moída com Batata');
        expect(response.statusCode).to.equals(200);

        done();
      });
    });
  });
  describe(`GET ${ENDPOINT}`, () => {
    it('2 Cliente Cardapio Prato GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/1`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        console.log(ENDPOINT);
        console.log(response.result);
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });
  describe(`PUT /cardapio_prato/empresa`, () => {
    it('3 Cliente Cardapio Prato PUT returns 200 HTTP status code', (done) => {
      let payload = {
        descricao_prato: 'Omelete com salame'
      };
      const options = {
        method: 'PUT',
        url: '/cardapio_prato/empresa/4',
        headers: {'Authorization': `Bearer ${token}`},
        payload: payload
      };
      server.inject(options, (response) => {
        // console.log(response.result);
        expect(response.statusCode).to.equals(403);
        done();
      });
    });
  });
  describe(`POST /cardapio_prato/empresa`, () => {
    it('4 Cliente Cardapio Prato POST returns 200 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: '/cardapio_prato/empresa',
        headers: {'Authorization': `Bearer ${token}`},
        payload: getDefault()
      };
      server.inject(options, (response) => {
        console.log(response.result);
        expect(response.statusCode).to.equals(403);
        done();
      });
    });
  });
});

function getDefault () {
  let payload = {
    idcardapio: 1,
    idprato: 1,
    descricao_prato: 'Pizza'
  };
  return payload;
}
