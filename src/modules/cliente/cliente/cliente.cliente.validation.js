'use strict';

const Schema = require('../cliente.schema');
const Joi = require('joi');

const schema = Schema.getSchema();
const query = Schema.getQuery();

module.exports = {
  list: list,
  listGrupos: listGrupos,
  read: read,
  update: update,
  destroy: destroy,
  login: login,
  logout: logout
};

function list () {
  return {
    headers: schema.fields,
    query: query
  };
}

function listGrupos () {
  return {};
}

function read () {
  return {
  };
}

function update () {
  return {
    payload: Joi.object({
      email: schema
        .email,
      password: schema
        .password,
      nome: schema
        .nome,
      ddd: schema
        .ddd,
      telefone: schema
        .telefone,
      tipotelefone: schema
        .tipotelefone
    })
  };
}

function destroy () {
  return {
  };
}

function logout () {
  return {};
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
