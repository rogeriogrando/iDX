'use strict';

const Joi = require('joi');

module.exports = {
  getSchema: getSchema,
  getQuery: getQuery
};

const schema = {
  idempresa: Joi
    .number()
    .integer(),
  idcardapio: Joi
    .number()
    .integer(),
  idcardapio_prato: Joi
    .number()
    .integer(),
  idcardapio_prato_porcao: Joi
    .number()
    .integer(),
  iditem_porcao: Joi
    .number()
    .integer(),
  idprato: Joi
    .number()
    .integer(),
  nomefantasia: Joi
    .string()
    .min(1)
    .max(60)
    .trim(),
  cidade: Joi
    .string()
    .min(1)
    .max(60)
    .trim(),
  uf: Joi
    .string()
    .min(1)
    .max(2)
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
  dia: Joi
    .string()
    .min(1)
    .max(20)
    .trim(),
  descricao_prato: Joi
    .string()
    .min(1)
    .max(255)
    .trim(),
  item: Joi
    .string()
    .min(1)
    .max(50)
    .trim(),
  vl_porcao: Joi
    .number(),
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
