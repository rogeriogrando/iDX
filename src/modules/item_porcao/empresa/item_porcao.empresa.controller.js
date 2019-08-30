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
    const model = request.database.ItemPorcao;
    const credencial = request.auth.credentials.id;
    const Op = request.database.Sequelize.Op;
/*
    return reply(await model.scope({method: ['empresa', credencial]}).findAndCountAll({
      attributes: ['idempresa', 'unidade_medida', 'item', 'qt_porcao', 'vl_porcao'],
      where: searchAll(request.query.search, Op),
      offset: request.offset(),
      limit: request.limit()
    }));
*/

    const options = {
      attributes: ['idempresa', 'unidade_medida', 'item', 'qt_porcao', 'vl_porcao'],
      where: searchAll(request.query.search, Op),
      order: ['iditem_porcao'],
      offset: request.offset(),
      limit: request.limit()
    };

    const values = await model.scope({method: ['empresa', credencial]}).findAndCountAll(request.fieldsAll(options));
    return reply(values).header('allowing-fields', request.fieldsHeaders(options));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function create (request, reply) {
  try {
    const database = request.database;
    const model = database.ItemPorcao;
    const payload = request.payload;
    payload.idempresa = request.auth.credentials.id;
    const value = await model.create(request.payload);
    return reply({ idempresa: value.idempresa, item: value.item, unidade_medida: value.unidade_medida });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.ItemPorcao;
    const credencial = request.auth.credentials.id;
    const item = request.params.item;
    const options = {
      where: {idempresa: credencial, item: item},
      attributes: ['iditem_porcao', 'idempresa', 'unidade_medida', 'item', 'qt_porcao', 'vl_porcao']
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
    const model = request.database.ItemPorcao;
    const credencial = request.auth.credentials.id;
    const item = request.params.item;
    const unidadeMedida = request.params.unidade_medida;
    const payload = request.payload;
    const value = await model.findOne({where: {idempresa: credencial, item: item, unidade_medida: unidadeMedida}});

    if (!value) {
      return reply.notFound();
    }
    const valueUpdate = await value.update(payload, {where: {idempresa: credencial, item: item, unidade_medida: unidadeMedida}});
    return reply({idempresa: valueUpdate.idempresa, item: item, unidade_medida: unidadeMedida});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function destroy (request, reply) {
  try {
    const model = request.database.ItemPorcao;
    const credencial = request.auth.credentials.id;
    const item = request.params.item;
    const value = await model.findOne({where: {idempresa: credencial, item: item}});
    if (!value) {
      return reply.notFound();
    }

    await value.destroy();

    return reply({
      idempresa: value.idempresa,
      item: value.item,
      unidade_medida: value.unidadeMedida,
      delete: true
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

function searchAll (search, Op) {
  if (!search) return;
  return {
    item: {
      [Op.iLike]: '%' + search + '%'
    }
  };
}
