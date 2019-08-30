'use strict';

const jwt = require('jsonwebtoken');
const client = require('../../../core/client.redis');

module.exports = {
  create: create,
  login: login
};

async function create (request, reply) {
  try {
    const database = request.database;
    const model = database.Cliente;
    const value = await model.create(request.payload);
    // return reply({ id: value.id });
    const tokenCliente = getToken(value.id);

    setRedis(tokenCliente, value.id);

    return reply({
      token: tokenCliente
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function login (request, reply) {
  try {
    const model = request.database.Cliente;
    const credentials = request.payload;

    const cliente = await model.findOne({ where: {email: credentials.email} });

    if (!cliente) {
      return reply.unauthorized('Email or Password invalid');
    }

    if (!cliente.validatePassword(credentials.password)) {
      return reply.unauthorized('Email or Password invalid');
    }

    const tokenCliente = getToken(cliente.id);
    console.log(tokenCliente);
    setRedis(tokenCliente, cliente.id);

    return reply({
      token: tokenCliente
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

function setRedis (token, id) {
  client.set(token, id);
  client.expire(token, (60 * 60) * 24);
}

function getToken (id) {
  const secretKey = process.env.JWT || 'template';

  return jwt.sign({
    id: id,
    scope: ['cliente']
  }, secretKey, {expiresIn: '2h'});
}
