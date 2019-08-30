'use strict';

const Schema = require('../cliente_endereco.schema');
const Joi = require('joi');

const schema = Schema.getSchema();
const query = Schema.getQuery();

module.exports = {
  list: list,
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
  };
}

function update () {
  return {
    payload: Joi.object({
      idcliente: schema
        .idcliente,
      cep: schema
        .cep,
      uf: schema
        .uf,
      cidade: schema
        .cidade,
      bairro: schema
        .bairro,
      rua: schema
        .rua,
      numero: schema
        .numero,
      complemento: schema
        .complemento,
      referencia: schema
        .referencia,
      principal: schema
        .referencia
    })
  };
}

function destroy () {
  return {
  };
}
