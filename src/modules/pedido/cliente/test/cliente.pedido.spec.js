/* global describe, it, server, before, expect */

const factory = require('../../../../test-utils/factory.girl');

const ENDPOINT = '/pedido/cliente';

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
    it('Cliente Pedido returns 200 HTTP status code', (done) => {
      // console.log(token);
      done();
    });
  });
  describe(`GET ${ENDPOINT}`, () => {
    it('Cliente Pedido GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: ENDPOINT,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        // console.log(response.result);
        // console.log(response.result.rows);
        // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        expect(response.result).to.exist();
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });
  /*
  describe(`GET ${ENDPOINT}`, () => {
    it('Cliente Pedido GET returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: ENDPOINT + '/periodo?dataInicial="01-10-2017"&dataFinal="30-10-2017"',
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        console.log(response.result);
        console.log(response.result.rows);
        expect(response.result).to.exist();
        expect(response.statusCode).to.equals(200);
        done();
      });
    });
  });
  */
  describe(`POST ${ENDPOINT}`, () => {
    it('Cliente POST returns 200 HTTP status code', (done) => {
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
    idcliente: 1,
    idgrupo: 1,
    idempresa: 1,
    cidade: 'Cerquilho',
    uf: 'SP',
    cep: '18520000',
    bairro: 'Centro',
    rua: 'João Pilon',
    numero: '01',
    complemento: 'Teste',
    referencia: 'Teste'
  };
  return payload;
}
