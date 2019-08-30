'use strict';

const Joi = require('joi');

module.exports = {
  getSchema: getSchema,
  getQuery: getQuery
};

const schema = {
  idcliente: Joi
    .number()
    .integer()
    .min(0),
  cep: Joi
    .string()
    .min(1)
    .max(8)
    .trim(),
  uf: Joi
    .string()
    .min(1)
    .max(2)
    .trim(),
  cidade: Joi
    .string()
    .min(1)
    .max(60)
    .trim(),
  bairro: Joi
    .string()
    .min(1)
    .max(60)
    .trim(),
  rua: Joi
    .string()
    .min(1)
    .max(60)
    .trim(),
  numero: Joi
    .string()
    .min(1)
    .max(10)
    .trim(),
  complemento: Joi
    .string()
    .min(1)
    .max(60)
    .trim(),
  referencia: Joi
    .string()
    .min(1)
    .max(100)
    .trim(),
  principal: Joi
    .boolean,
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
