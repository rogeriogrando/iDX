const Schema = require('../cardapio_prato_porcao.schema');
const Joi = require('joi');

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
};

const schema = Schema.getSchema();
const query = Schema.getQuery();

function list () {
  return {
    headers: schema.fields,
    query: query
  };
}

function read () {
  return {
    params: {
      idcardapio_prato_porcao: schema
        .idcardapio_prato_porcao
        .positive()
        .required()
    }
  };
}

function create () {
  return {
    payload: Joi.object({
      idcardapio_prato: schema
        .idcardapio_prato
        .required(),
      iditem_porcao: schema
        .iditem_porcao
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
      idcardapio_prato_porcao: schema
        .idcardapio_prato_porcao
        .positive()
        .required()
    },
    payload: Joi.object({
      iditem_porcao: schema
        .iditem_porcao
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
      idcardapio_prato: schema
        .idcardapio_prato
        .positive()
        .required(),
      iditem_porcao: schema
        .iditem_porcao
        .required()
    }
  };
}
