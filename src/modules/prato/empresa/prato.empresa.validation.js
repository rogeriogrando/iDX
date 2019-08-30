const Schema = require('../prato.schema');
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
      id: schema
        .id
        .positive()
        .required()
    }
  };
}

function create () {
  return {
    payload: Joi.object({
      tamanho: schema
        .tamanho
        .required(),
      descricao: schema
        .descricao
        .required(),
      qt_porcao: schema
        .qt_porcao
        .required()
    })
  };
}

function update () {
  return {
    params: {
      id: schema
        .id
        .positive()
        .required()
    },
    payload: Joi.object({
      tamanho: schema
        .tamanho
        .required(),
      descricao: schema
        .descricao
        .required(),
      qt_porcao: schema
        .qt_porcao
        .required()
    })
  };
}

function destroy () {
  return {
    params: {
      id: schema
        .id
        .positive()
        .required()
    }
  };
}
