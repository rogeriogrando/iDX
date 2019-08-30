const Schema = require('../cardapio_prato.schema');

const schema = Schema.getSchema();

module.exports = {
  read: read,
  list: list
};

function list () {
  return {
    params: {
      idempresa: schema
        .idempresa
        .required()
    }
  };
}

function read () {
  return {
    params: {
      idempresa: schema
        .idempresa
        .required(),
      idcardapio_prato: schema
        .idcardapio_prato
        .required()
    }
  };
}
