/* global describe, it, server, before, expect */

const factory = require('../../../../test-utils/factory.girl');

const ENDPOINT = '/cliente/public';

describe(`Routes cliente ${ENDPOINT}`, () => {
  let token = null;
  before((done) => {
    factory.getTokenCliente(server)
    .then((context) => {
      token = context.token;
      done();
    });
  });
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
    email: 'teste@teste.com',
    password: 'teste',
    nome: 'teste',
    ddd: '21',
    telefone: '777777777',
    tipotelefone: 'Residencial'
  };
  return payload;
}
