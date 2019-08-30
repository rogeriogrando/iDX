const Schema = require('../cardapio_prato.schema');
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
      idcardapio_prato: schema
        .idcardapio_prato
        .required()
    }
  };
}

function create () {
  return {
    payload: Joi.object({
      idcardapio: schema
        .idcardapio
        .required(),
      idprato: schema
        .idprato
        .required(),
      descricao_prato: schema
        .descricao_prato
        .required()
    })
  };
}

function update () {
  return {
    params: {
      idcardapio_prato: schema
        .idcardapio_prato
        .required()
    },
    payload: Joi.object({
      descricao_prato: schema
        .descricao_prato
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
        .required()
    }
  };
}
