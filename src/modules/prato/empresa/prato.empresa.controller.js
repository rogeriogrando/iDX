'use strict';

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
};

async function list (request, reply) {
  try {
    const model = request.database.Prato;
    const Op = request.database.Sequelize.Op;
    const database = request.database;
    const credencial = request.auth.credentials.id;
    const options = {
      attributes: ['id', 'idempresa', 'tamanho', 'descricao', 'qt_porcao'],
      include: [{
        model: database.Empresa,
        attributes: ['nomefantasia']
      }],
      where: searchAll(request.query.search, Op),
      order: ['qt_porcao'],
      offset: request.offset(),
      limit: request.limit()
    };
    const values = await model.scope({method: ['empresa', credencial]}).findAndCountAll(options);
    return reply(values).header('allowing-fields', request.fieldsHeaders(options));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function create (request, reply) {
  try {
    const database = request.database;
    const model = database.Prato;
    const payload = request.payload;
    payload.idempresa = request.auth.credentials.id;
    const value = await model.create(request.payload);
    return reply({ id: value.id });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.Prato;
    const credencial = request.auth.credentials.id;
    const database = request.database;
    const id = request.params.id;
    const options = {
      where: {id: id},
      attributes: ['id', 'idempresa', 'tamanho', 'descricao'],
      include: [{
        model: database.Empresa,
        attributes: ['nomefantasia']
      }]
    };

    const value = await model.scope({method: ['empresa', credencial]}).findOne(options);
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
    const model = request.database.Prato;
    const id = request.params.id;
    const payload = request.payload;
    const credencial = request.auth.credentials.id;
    const value = await model.scope({method: ['empresa', credencial]}).findOne({where: {id: id}});

    if (!value) {
      return reply.notFound();
    }
    console.log(credencial);
    const valueUpdate = await value.update(payload, {where: {id: id, idempresa: credencial}});
    return reply({id: valueUpdate.id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function destroy (request, reply) {
  try {
    const model = request.database.Prato;
    const credencial = request.auth.credentials.id;
    const id = request.params.id;
    const value = await model.scope({method: ['empresa', credencial]}).findOne({where: {id: id}});
    if (!value) {
      return reply.notFound();
    }
    await value.destroy();

    return reply({
      id: value.id,
      delete: true
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

function searchAll (search) {
  if (!search) return;
  return {
    nome: {
      $ilike: '%' + search + '%'
    }
  };
}
