const Schema = require('../grupo_cliente.schema');

const Joi = require('joi');

const schema = Schema.getSchema();
const query = Schema.getQuery();

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
};

function list () {
  return {
    headers: schema.fields,
    query: query
  };
}

function read () {
  return {
    params: {
      idcliente: schema
        .idcliente,
      idgrupo: schema
        .idgrupo
    }
  };
}

function create () {
  return {
    payload: Joi.object({
      idcliente: schema
        .idcliente
        .required(),
      idgrupo: schema
        .idgrupo
        .required()
    })
  };
}

function update () {
  return {
    params: {
      idcliente: schema
        .idcliente
        .positive()
        .required(),
      idgrupo: schema
        .idgrupo
        .positive()
        .required()
    },
    payload: Joi.object({
      habilitado: schema
        .habilitado
        .required()
    })
  };
}

function destroy () {
  return {
    params: {
      idcliente: schema
        .idcliente
        .positive()
        .required(),
      idgrupo: schema
        .idgrupo
        .positive()
        .required()
    }
  };
}
