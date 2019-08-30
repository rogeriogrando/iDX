'use strict';

const client = require('../../../core/client.redis');

module.exports = {
  list: list,
  read: read,
  update: update,
  destroy: destroy,
  logout: logout
};

async function list (request, reply) {
  try {
    const model = request.database.Empresa;
    const credencial = request.auth.credentials.id;
    return reply(await model.scope({method: ['empresa', credencial]}).find({attributes: ['id', 'email', 'razao', 'nomefantasia', 'cnpj', 'cep', 'cidade', 'uf', 'bairro', 'rua', 'numero', 'complemento', 'referencia', 'imagepath', 'sobre', 'funcionamento']}));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.Empresa;
    const credencial = request.auth.credentials.id;
    const options = {
      where: {id: credencial},
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

async function update (request, reply) {
  try {
    const model = request.database.Empresa;
    const credencial = request.auth.credentials.id;
    const payload = request.payload;
    const value = await model.findOne({where: {id: credencial}});
    if (!value) {
      return reply.notFound();
    }
    const valueUpdate = await value.update(payload, {where: {id: credencial}});
    return reply({id: valueUpdate.id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function destroy (request, reply) {
  try {
    const model = request.database.Empresa;
    const credencial = request.auth.credentials.id;
    await model.destroy({where: {id: credencial}});

    return reply({
      id: credencial,
      delete: true
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function logout (request, reply) {
  try {
    const token = request.headers.authorization.replace('Bearer ', '');

    client.del(token, (err, result) => {
      if (err) {
        throw err;
      }
      return reply();
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}
