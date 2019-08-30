'use strict';

const Joi = require('joi');

module.exports = {
  getSchema: getSchema,
  getQuery: getQuery
};

const schema = {
  idempresa: Joi
    .number()
    .integer()
    .min(0),
  idcardapio_prato_porcao: Joi
    .number()
    .integer()
    .min(0),
  idcardapio_prato: Joi
    .number()
    .integer()
    .min(0),
  iditem_porcao: Joi
    .number()
    .integer()
    .min(0),
  qt_porcao: Joi
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

function getQuery () {
  return query;
}

function getSchema () {
  return schema;
}
