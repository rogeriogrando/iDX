const Schema = require('../vw_cardapio.schema');

module.exports = {
  list: list,
  read: read
};

const schema = Schema.getSchema();
const query = Schema.getQuery();

function list () {
  return {
    params: {
      idempresa: schema
        .idempresa
    },
    headers: schema.fields,
    query: query
  };
}

function read () {
  return {
    params: {
      idempresa: schema
        .idempresa,
      idcardapio: schema
        .idcardapio
    }
  };
}
