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
    const model = request.database.Cardapio;
    const credencial = request.auth.credentials.id;
    const Op = request.database.Sequelize.Op;
    return reply(await model.scope({method: ['empresa', credencial]}).findAndCountAll({
      attributes: ['idcardapio', 'idempresa', 'dia', 'ativo'],
      where: searchAll(request.query.search, Op),
      offset: request.offset(),
      limit: request.limit()
    }));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function create (request, reply) {
  try {
    const database = request.database;
    const model = database.Cardapio;
    const payload = request.payload;
    payload.idempresa = request.auth.credentials.id;
    const value = await model.create(request.payload);
    return reply({ idcardapio: value.idcardapio });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.Cardapio;
    const dia = request.params.dia;
    const ativo = request.params.ativo;
    const credencial = request.auth.credentials.id;
    const options = {
      where: {dia: dia, ativo: ativo, idempresa: credencial},
      attributes: ['idcardapio', 'idempresa', 'dia', 'ativo']
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
    const model = request.database.Cardapio;
    const credencial = request.auth.credentials.id;
    const dia = request.params.dia;
    const ativo = request.params.ativo;
    const payload = request.payload;
    const value = await model.findOne({where: {dia: dia, ativo: ativo, idempresa: credencial}});
    if (!value) {
      return reply.notFound();
    }
    const valueUpdate = await value.update(payload, {where: {dia: dia, ativo: ativo, idempresa: credencial}});
    return reply({idcardapio: valueUpdate.idcardapio});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function destroy (request, reply) {
  try {
    const model = request.database.Cardapio;
    const idcardapio = request.params.idcardapio;
    const credencial = request.auth.credentials.id;
    const value = await model.findOne({where: {idcardapio: idcardapio, idempresa: credencial}});
    if (!value) {
      return reply.notFound();
    }
    await value.destroy();

    return reply({
      idcardapio: value.idcardapio,
      delete: true
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

function searchAll (search, Op) {
  if (!search) return;
  return {
    dia: {
      [Op.iLike]: '%' + search + '%'
    }
  };
}
