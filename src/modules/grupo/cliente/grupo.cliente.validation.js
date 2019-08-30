const Schema = require('../grupo.schema');
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
      id: schema
        .id
        .positive()
    }
  };
}

function create () {
  return {
    payload: Joi.object({
      grupo: schema
        .grupo
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
      grupo: schema
        .grupo
    })
  };
}

function destroy () {
  return {
    params: {
      id: schema
        .id
        .positive()
    }
  };
}
