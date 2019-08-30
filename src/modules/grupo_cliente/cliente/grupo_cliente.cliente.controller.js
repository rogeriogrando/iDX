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
    const model = request.database.Grupo_Cliente;
    return reply(await model.findAndCountAll({attributes: ['idcliente', 'idgrupo', 'habilitado']}));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function create (request, reply) {
  try {
    const database = request.database;
    const model = database.Grupo_Cliente;
    const value = await model.create(request.payload);
    return reply({ idcliente: value.idcliente, idgrupo: value.idgrupo });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.Grupo_Cliente;
    const idgrupo = request.params.idgrupo;

    const options = {
      where: {idgrupo: idgrupo},
      attributes: ['idcliente', 'idgrupo', 'iddonogrupo', 'habilitado']
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
    const model = request.database.Grupo_Cliente;
    const idgrupo = request.params.idgrupo;
    const payload = request.payload;
    const value = await model.findOne({where: {idgrupo: idgrupo}});

    if (!value) {
      return reply.notFound();
    }
    const valueUpdate = await value.update(payload, {where: {idgrupo: idgrupo}});
    return reply({idgrupo: valueUpdate.idgrupo});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function destroy (request, reply) {
  try {
    const model = request.database.Grupo_Cliente;
    const idgrupo = request.params.idgrupo;

    const value = await model.findOne({where: {idgrupo: idgrupo}});
    if (!value) {
      return reply.notFound();
    }
    await value.destroy();

    return reply({
      idgrupo: value.idgrupo,
      delete: true
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}
