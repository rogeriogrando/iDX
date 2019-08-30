'use strict';

const Joi = require('joi');

module.exports = {
  getSchema: getSchema,
  getQuery: getQuery
};

const schema = {
  idprato: Joi
    .number()
    .integer()
    .min(0),
  idpedido: Joi
    .number()
    .integer()
    .min(0),
  idpempresa: Joi
    .number()
    .integer()
    .min(0),
  tamanho: Joi
    .string()
    .min(1)
    .max(1)
    .trim(),
  qt_porcao: Joi
    .number()
    .integer()
    .min(0),
  descricao: Joi
    .string()
    .min(1)
    .max(255)
    .trim(),
  quantidade: Joi
    .number()
    .integer()
    .min(0),
  quantidade_cancelada: Joi
    .number()
    .integer()
    .min(0),
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

