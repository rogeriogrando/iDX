'use strict';

const Schema = require('../cliente.schema');
const Joi = require('joi');

const schema = Schema.getSchema();

module.exports = {
  create: create,
  logout: logout,
  login: login
};

function create () {
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
