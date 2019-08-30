/* global describe, it, server, before, expect */

const factory = require('../../../../test-utils/factory.girl');

const ENDPOINT = '/empresa/public';

describe(`Routes empresa ${ENDPOINT}`, () => {
  let token = null;
  before((done) => {
    factory.getTokenEmpresa(server)
    .then((context) => {
      token = context.token;
      done();
    });
  });
  describe(`POST ${ENDPOINT}`, () => {
    it('Empresa POST returns 200 HTTP status code', (done) => {
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
    email: 'empeclusao@teste.com',
    password: 'empeclusao',
    razao: 'empeclusao',
    nomefantasia: 'empeclusao',
    cnpj: '22660729867',
    cep: '18520000',
    uf: 'SP',
    cidade: 'Cerquilho',
    bairro: 'Di Napoli',
    rua: 'teste',
    numero: '123',
    complemento: 'teste',
    referencia: 'teste'
  };
  return payload;
}
