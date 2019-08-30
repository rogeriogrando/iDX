'use strict';

const Joi = require('joi');

module.exports = {
  getSchema: getSchema,
  getQuery: getQuery
};

const schema = {
  idcardapio_prato: Joi
    .number()
    .integer()
    .min(0),
  idempresa: Joi
    .number()
    .integer()
    .min(0),
  idcardapio: Joi
    .number()
    .integer()
    .min(0),
  idprato: Joi
    .number()
    .integer()
    .min(0),
  descricao_prato: Joi
    .string()
    .min(1)
    .max(250)
    .trim(),
  dia: Joi
    .string()
    .min(1)
    .max(250)
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

