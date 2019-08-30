'use strict';

const Joi = require('joi');

module.exports = {
  getSchema: getSchema,
  getQuery: getQuery
};

const schema = {
  id: Joi
    .number()
    .integer()
    .min(0),
  email: Joi
    .string()
    .min(1)
    .max(120)
    .trim(),
  password: Joi
    .string()
    .min(1)
    .max(60)
    .trim(),
  nome: Joi
    .string()
    .min(1)
    .max(60)
    .trim(),
  ddd: Joi
    .string()
    .min(2)
    .max(2)
    .trim(),
  telefone: Joi
    .string()
    .min(1)
    .max(9)
    .trim(),
  tipotelefone: Joi
    .string()
    .min(0)
    .max(20)
    .trim(),
  fields: Joi.object({
    fields: Joi
    .string()
    .min(1)
    .max(250)
    .trim()
  }).options({ allowUnknown: true })
};

const query = {
  page: Joi
    .number()
    .integer()
    .optional(),
  limit: Joi
    .number()
    .integer()
    .min(0)
    .optional(),
  offset: Joi
    .number()
    .integer()
    .min(0)
    .optional(),
  search: Joi
    .string()
    .trim()
};

function getSchema () {
  return schema;
}

function getQuery () {
  return query;
}
