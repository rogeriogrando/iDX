const Schema = require('../item_porcao.schema');
const Joi = require('joi');

const schema = Schema.getSchema();
const query = Schema.getQuery();

module.exports = {
  list: list,
  read: read,
  create: create,
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
      item: schema
        .item
        .required()
    }
  };
}

function create () {
  return {
    payload: Joi.object({
      unidade_medida: schema
        .unidade_medida
        .required(),
      item: schema
        .item
        .required(),
      qt_porcao: schema
        .qt_porcao
        .required(),
      vl_porcao: schema
        .vl_porcao
        .required()
    })
  };
}

function update () {
  return {
    params: {
      unidade_medida: schema
        .unidade_medida
        .required(),
      item: schema
        .item
        .required()
    },
    payload: Joi.object({
      unidade_medida: schema
        .unidade_medida
        .required(),
      item: schema
        .item
        .required()
    })
  };
}

function destroy () {
  return {
    params: {
      item: schema
        .item
        .required()
    }
  };
}
