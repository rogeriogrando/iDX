const Schema = require('../pedido_prato.schema');
const Joi = require('joi');

const schema = Schema.getSchema();
const query = Schema.getQuery();

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update
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
      idprato: schema
        .idprato
        .positive()
        .required()
    }
  };
}

function create () {
  return {
    payload: Joi.object({
      idpedido: schema
        .idpedido
        .required(),
      idprato: schema
        .idprato
        .required(),
      tamanho: schema
        .tamanho
        .required(),
      qt_porcao: schema
        .qt_porcao
        .required(),
      descricao: schema
        .descricao
        .required(),
      quantidade: schema
        .quantidade
        .required()
    })
  };
}

function update () {
  return {
    params: {
      idprato: schema
        .idprato
        .positive()
        .required(),
      idpedido: schema
        .idpedido
        .positive()
        .required(),
      quantidade: schema
        .quantidade
        .positive()
        .required(),
      qt_porcao: schema
        .qt_porcao
        .positive()
        .required(),
      quantidade_cancelada: schema
        .quantidade_cancelada
        .required()
    },
    payload: Joi.object({
      idpedido: schema
        .idpedido
        .required(),
      quantidade: schema
        .quantidade
        .required(),
      qt_porcao: schema
        .qt_porcao
        .positive()
        .required(),
      quantidade_cancelada: schema
        .quantidade_cancelada
        .required()
    })
  };
}
