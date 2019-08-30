/* global describe, it, server, before, expect */

const factory = require('../../../../test-utils/factory.girl');

const ENDPOINT = '/prato/empresa';

describe(`Routes empresa ${ENDPOINT}`, () => {
  let token = null;
  before((done) => {
    factory.getTokenEmpresa(server)
    .then((context) => {
      token = context.token;
      done();
    });
  });
  describe(`GET ${ENDPOINT}`, () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: ENDPOINT,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        expect(response.result).to.exist();
        expect(response.result.count).to.equals(3);
        expect(response.result.rows[0].id).to.equals(1);
        expect(response.result.rows[0].idempresa).to.equals(1);
        expect(response.result.rows[0].tamanho).to.equals('P');
        expect(response.result.rows[0].descricao).to.equals('Alumínio');
        expect(response.result.rows[0].Empresa.nomefantasia).to.equals('Empresa');
        expect(response.statusCode).to.equals(200);

        done();
      });
    });
  });

  describe(`GET ${ENDPOINT}`, () => {
    it('Prato com LIMIT e OFFSET GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}?limit=1&offset=1`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        expect(response.result.rows[0].qt_porcao).to.equals(14);
        expect(response.result).to.exist();
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });

  describe(`GET ${ENDPOINT}`, () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/2`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        // console.log(response.result);
        expect(response.result.tamanho).to.equals('M');
        expect(response.result.descricao).to.equals('Alumínio');
        expect(response.result.Empresa.nomefantasia).to.equals('Empresa');
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });
  describe(`GET ${ENDPOINT}`, () => {
    it('returns 404 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/5`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        console.log(response.result);
        expect(response.statusCode).to.equals(404);
        done();
      });
    });
  });
  describe(`PUT ${ENDPOINT}`, () => {
    it('returns 404 HTTP status code', (done) => {
      let payload = {
        tamanho: 'X',
        descricao: 'Alumínio',
        qt_porcao: 9
      };
      const options = {
        method: 'PUT',
        url: `${ENDPOINT}/5`,
        headers: {'Authorization': `Bearer ${token}`},
        payload: payload
      };
      server.inject(options, (response) => {
        // console.log(response.result);
        expect(response.statusCode).to.equals(404);
        done();
      });
    });
  });
  describe(`PUT ${ENDPOINT}`, () => {
    it('returns 200 HTTP status code', (done) => {
      let payload = {
        tamanho: 'X',
        descricao: 'Alumínio',
        qt_porcao: 9
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
  describe(`POST ${ENDPOINT}`, () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: `${ENDPOINT}`,
        headers: {'Authorization': `Bearer ${token}`},
        payload: getDefault()
      };
      server.inject(options, (response) => {
        // console.log(response.result);
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });
  describe(`DELETE ${ENDPOINT}`, () => {
    it('returns 404 HTTP status code', (done) => {
      const options = {
        method: 'DELETE',
        url: `${ENDPOINT}/6`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        // console.log(response.result);
        expect(response.statusCode).to.equals(404);
        done();
      });
    });
  });
});

function getDefault () {
  let payload = {
    tamanho: 'Z',
    descricao: 'Alumínio',
    qt_porcao: 11
  };
  return payload;
}
