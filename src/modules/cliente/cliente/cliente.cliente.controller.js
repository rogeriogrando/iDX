'use strict';

const client = require('../../../core/client.redis');

module.exports = {
  list: list,
  listGrupos: listGrupos,
  read: read,
  update: update,
  destroy: destroy,
  logout: logout
};

async function list (request, reply) {
  try {
    const model = request.database.Cliente;
    const credencial = request.auth.credentials.id;
    return reply(await model.scope({method: ['cliente', credencial]}).findAll({
      attributes: ['id', 'email', 'nome', 'ddd', 'telefone', 'tipotelefone']
    }));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function listGrupos (request, reply) {
  try {
    const model = request.database.Grupo_Cliente;
    const credencial = request.auth.credentials.id;
    const options = {
      attributes: ['habilitado'],
      include: [{
        model: request.database.Grupo,
        attributes: ['grupo']
      }],
      where: {id: credencial},
      offset: request.offset(),
      limit: request.limit
    };
    const values = await model.findAndCountAll(options);
    return reply(values);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.Cliente;
    const credencial = request.auth.credentials.id;
    const options = {
      where: {id: credencial},
      attributes: ['id', 'email', 'nome', 'ddd', 'telefone', 'tipotelefone']
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
    const model = request.database.Cliente;
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
    const model = request.database.Cliente;
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
