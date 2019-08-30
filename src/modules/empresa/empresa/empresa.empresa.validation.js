'use strict';

const Schema = require('../empresa.schema');
const Joi = require('joi');

const schema = Schema.getSchema();
const query = Schema.getQuery();

module.exports = {
  list: list,
  read: read,
  update: update,
  destroy: destroy,
  logout: logout
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

function update () {
  return {
    params: {
      id: schema
        .id
        .positive()
        .required()
    },
    payload: Joi.object({
      id: schema
        .id,
      email: schema
        .email,
      password: schema
        .password,
      razao: schema
        .razao,
      nomefantasia: schema
        .nomefantasia,
      cnpj: schema
        .cnpj,
      cep: schema
        .cep,
      cidade: schema
        .cidade,
      uf: schema
        .uf,
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
      imagepath: schema
        .imagepath,
      sobre: schema
        .sobre,
      funcionamento: schema
        .funcionamento
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

function logout () {
  return {};
}
