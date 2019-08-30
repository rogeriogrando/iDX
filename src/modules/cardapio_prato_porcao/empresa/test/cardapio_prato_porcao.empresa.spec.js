/* global describe, it, server, before, expect */

const factory = require('../../../../test-utils/factory.girl');

const ENDPOINT = '/cardapio_prato_porcao/empresa';

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
      done();
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
        expect(response.result).to.exist();
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });

  describe(`GET ${ENDPOINT}`, () => {
    it('Cardapio Prato Porção com LIMIT e OFFSET GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}?limit=1&offset=1`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        expect(response.result.rows[0].iditem_porcao).to.equals(3);
        expect(response.result).to.exist();
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });

  describe(`GET ${ENDPOINT}`, () => {
    it('Cardapio Prato GET returns 404 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/5`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        expect(response.statusCode).to.equals(404);
        done();
      });
    });
  });
  describe(`PUT ${ENDPOINT}`, () => {
    it('Cardapio Prato PUT returns 200 HTTP status code', (done) => {
      let payload = {
        iditem_porcao: 6,
        qt_porcao: 2
      };
      const options = {
        method: 'PUT',
        url: `${ENDPOINT}/1`,
        headers: {'Authorization': `Bearer ${token}`},
        payload: payload
      };
      server.inject(options, (response) => {
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
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });
});

function getDefault () {
  let payload = {
    idcardapio_prato: 1,
    iditem_porcao: 2,
    qt_porcao: 1
  };
  return payload;
}
