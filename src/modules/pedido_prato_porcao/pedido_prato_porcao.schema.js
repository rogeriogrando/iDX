'use strict';

const Joi = require('joi');

module.exports = {
  getSchema: getSchema,
  getQuery: getQuery
};

const schema = {
  idpedido_prato_porcao: Joi
    .number()
    .integer()
    .min(0),
  idpedidoprato: Joi
    .number()
    .integer()
    .min(0),
  idempresa: Joi
    .number()
    .integer()
    .min(0),
  iditem_porcao: Joi
    .number()
    .integer()
    .min(0),
  item: Joi
    .string()
    .min(1)
    .max(50)
    .trim(),
  qt_porcao_item: Joi
    .number()
    .integer()
    .min(0),
  vl_porcao: Joi
    .number()
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
