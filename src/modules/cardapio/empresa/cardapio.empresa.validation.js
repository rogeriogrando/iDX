const Schema = require('../cardapio.schema');
const Joi = require('joi');

const schema = Schema.getSchema();
const query = Schema.getQuery();

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
};

function list () {
  return {
    headers: schema.fields,
    query: query
  };
}

function read () {
  return {
    params: {
      dia: schema
        .dia
        .required(),
      ativo: schema
        .ativo
        .required()
    }
  };
}

function create () {
  return {
    payload: Joi.object({
      dia: schema
        .dia
        .required(),
      ativo: schema
        .ativo
    })
  };
}

function update () {
  return {
    params: {
      dia: schema
        .dia
        .required(),
      ativo: schema
        .ativo
        .required()
    }
  };
}

function destroy () {
  return {
    params: {
      idcardapio: schema
        .idcardapio
        .positive()
        .required(),
      dia: schema
        .dia
        .required()
    }
  };
}
