const Schema = require('../pedido_prato_porcao.schema');
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
      idpedido_prato_porcao: schema
        .idpedido_prato_porcao
        .positive()
        .required()
    }
  };
}

function create () {
  return {
    payload: Joi.object({
      idpedidoprato: schema
        .idpedidoprato
        .required(),
      qt_porcao_item: schema
        .qt_porcao_item
        .required(),
      iditem_porcao: schema
        .iditem_porcao
        .required()
    })
  };
}

function update () {
  return {
    params: {
      idpedido_prato_porcao: schema
        .idpedido_prato_porcao
        .positive()
        .required()
    },
    payload: Joi.object({
      idpedidoprato: schema
        .idpedidoprato
        .required(),
      qt_porcao_item: schema
        .qt_porcao_item
        .required()
    })
  };
}

function destroy () {
  return {
    params: {
      idpedido_prato_porcao: schema
        .idpedido_prato_porcao
        .positive()
        .required()
    }
  };
}
