/* global describe, it, server, before, expect */

const factory = require('../../../../test-utils/factory.girl');

const ENDPOINT = '/cardapio_prato/empresa';

describe(`Routes admin ${ENDPOINT}`, () => {
  let token = null;
  before((done) => {
    factory.getTokenEmpresa(server)
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
    it('Cardapio Prato com LIMIT e OFFSET GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}?limit=1&offset=1`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        expect(response.result.rows[0].descricao_prato).to.equals('Panqueca de Carne');
        expect(response.result).to.exist();
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });

  describe(`GET ${ENDPOINT}`, () => {
    it('Cardapio Prato GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: ENDPOINT,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXX');
        console.log(response.result.count);
        expect(response.result).to.exist();
        expect(response.result.count).to.equals(4);
        expect(response.statusCode).to.equals(200);

        done();
      });
    });
  });
  describe(`GET ${ENDPOINT}`, () => {
    it('Cardapio Prato GET returns 200 HTTP status code', (done) => {
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
    it('Cardapio Prato PUT returns 200 HTTP status code', (done) => {
      let payload = {
        descricao_prato: 'Omelete com salame'
      };
      const options = {
        method: 'PUT',
        url: `${ENDPOINT}/4`,
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
  describe(`POST ${ENDPOINT}`, () => {
    it('Cardapio Prato POST returns 200 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: `${ENDPOINT}`,
        headers: {'Authorization': `Bearer ${token}`},
        payload: getDefault()
      };
      server.inject(options, (response) => {
        console.log(response.result);
        expect(response.statusCode).to.equals(200);
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
