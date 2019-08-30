/* global describe, it, server, before, expect */

const factory = require('../../../../test-utils/factory.girl');

const ENDPOINT = '/pedido_prato_porcao/cliente';

describe(`Routes pedido_prato_porcao ${ENDPOINT}`, () => {
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
    it('Cliente pedido_prato_porcao GET returns 200 HTTP status code', (done) => {
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
  describe(`POST ${ENDPOINT}`, () => {
    it('pedido_prato_porcao POST returns 200 HTTP status code', (done) => {
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
    idpedidoprato: 1,
    iditem_porcao: 1,
    qt_porcao_item: 7
  };
  return payload;
}
