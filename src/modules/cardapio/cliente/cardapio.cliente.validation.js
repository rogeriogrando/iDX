const Schema = require('../cardapio.schema');

const schema = Schema.getSchema();
const query = Schema.getQuery();

module.exports = {
  list: list,
  read: read
};

function list () {
  return {
    params: {
      idempresa: schema
        .idempresa
        .required()
    },
    headers: schema.fields,
    query: query
  };
}

function read () {
  return {
    params: {
      idempresa: schema
        .idempresa
        .required(),
      dia: schema
        .dia
        .required()
    }
  };
}
