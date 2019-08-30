'use strict';

const Schema = require('../empresa.schema');
const Joi = require('joi');

const schema = Schema.getSchema();
const query = Schema.getQuery();

module.exports = {
  list: list,
  read: read,
  create: create,
  login: login
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
    }
  };
}

function create () {
  return {
    payload: Joi.object({
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
function login () {
  return {
    payload: Joi.object({
      email: schema
        .email
        .required(),
      password: schema
        .password
        .required()
    })
  };
}
