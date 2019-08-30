const Schema = require('../pedido.schema');
const Joi = require('joi');

const schema = Schema.getSchema();
const query = Schema.getQuery();

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update
};

function list () {
  return {
    headers: schema.fields,
    query: query
  };
}

function read () {
  return {
    query: {
      dataInicial: schema
        .datapedido,
      dataFinal: schema
        .datapedido
    }
  };
}

function create () {
  return {
    payload: Joi.object({
      idcliente: schema
        .idcliente,
      idgrupo: schema
        .idgrupo,
      idempresa: schema
        .idempresa,
      cep: schema
        .cep,
      uf: schema
        .uf,
      cidade: schema
        .cidade,
      bairro: schema
        .bairro,
      rua: schema
        .rua,
      numero: schema
        .numero,
      complemento: schema
        .complemento,
      referencia: schema
        .referencia
    })
  };
}

function update () {
  return {
    params: {
      id: schema
        .id
        .positive()
    },
    payload: Joi.object({
      idcliente: schema
        .idcliente,
      idgrupo: schema
        .idgrupo,
      idempresa: schema
        .idempresa,
      cep: schema
        .cep,
      uf: schema
        .uf,
      cidade: schema
        .cidade,
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
      solicitado: schema
        .solicitado,
      cancelado_cli: schema
        .cancelado_cli
    })
  };
}
