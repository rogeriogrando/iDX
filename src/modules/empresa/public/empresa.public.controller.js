'use strict';

const jwt = require('jsonwebtoken');
const client = require('../../../core/client.redis');

module.exports = {
  list: list,
  create: create,
  read: read,
  login: login
};

async function list (request, reply) {
  try {
    const model = request.database.Empresa;
    const Op = request.database.Sequelize.Op;
    const options = {
      attributes: ['id', 'email', 'razao', 'nomefantasia', 'cnpj', 'cep', 'cidade', 'uf', 'bairro', 'rua', 'numero', 'complemento', 'referencia', 'imagepath', 'sobre', 'funcionamento'],
      where: searchAll(request.query.search, Op),
      offset: request.offset(),
      limit: request.limit()
    };
    const values = await model.findAndCountAll(request.fieldsAll(options));
    return reply(values).header('allowing-fields', request.fieldsHeaders(options));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function create (request, reply) {
  try {
    const database = request.database;
    const model = database.Empresa;
    const value = await model.create(request.payload);
    return reply({ id: value.id });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.Empresa;
    const id = request.params.id;
    const options = {
      where: {id: id},
      attributes: ['id', 'email', 'razao', 'nomefantasia', 'cnpj', 'cep', 'cidade', 'uf', 'bairro', 'rua', 'numero', 'complemento', 'referencia', 'imagepath', 'sobre', 'funcionamento']
    };
    const value = await model.findOne(options);
    if (!value) {
      return reply.notFound();
    }
    return reply(value);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function login (request, reply) {
  try {
    const model = request.database.Empresa;
    const credentials = request.payload;

    const empresa = await model.findOne({ where: {email: credentials.email} });
    if (!empresa) {
      return reply.unauthorized('Email or Password invalid');
    }

    if (!empresa.validatePassword(credentials.password)) {
      return reply.unauthorized('Email or Password invalid');
    }

    const tokenEmpresa = getToken(empresa.id);

    setRedis(tokenEmpresa, empresa.id);

    return reply({
      token: tokenEmpresa
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

function searchAll (search, Op) {
  if (!search) return;
  return {
    nome: {
      [Op.iLike]: '%' + search + '%'
    }
  };
}

function setRedis (token, id) {
  client.set(token, id);
  client.expire(token, (60 * 60) * 24);
}

function getToken (id) {
  const secretKey = process.env.JWT || 'template';

  return jwt.sign({
    id: id,
    scope: ['empresa']
  }, secretKey, {expiresIn: '2h'});
}
