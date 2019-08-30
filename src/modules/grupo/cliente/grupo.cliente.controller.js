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
    const model = request.database.Grupo;
    const Op = request.database.Sequelize.Op;
    const options = {
      attributes: ['id', 'grupo'],
      where: searchAll(request.search(), Op),
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
    const model = database.Grupo;
    const value = await model.create(request.payload);
    return reply({ id: value.id });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.Grupo;
    const id = request.params.id;

    const options = {
      where: {id: id},
      attributes: ['id', 'grupo']
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
    const model = request.database.Grupo;
    const id = request.params.id;
    const payload = request.payload;
    const value = await model.findOne({where: {id: id}});
    if (!value) {
      return reply.notFound();
    }
    const valueUpdate = await value.update(payload, {where: {id: id}});
    return reply({id: valueUpdate.id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function destroy (request, reply) {
  try {
    const model = request.database.Grupo;
    const id = request.params.id;
    const value = await model.findOne({where: {id: id}});
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
    grupo: {
      $ilike: '%' + search + '%'
    }
  };
}
