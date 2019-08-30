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
    const model = request.database.CardapioPratoPorcao;
    const Op = request.database.Sequelize.Op;
    const options = {
      attributes: ['idcardapio_prato_porcao', 'idcardapio_prato', 'iditem_porcao', 'qt_porcao'],
      where: searchAll(request.query.search, Op),
      order: ['idcardapio_prato_porcao'],
      offset: request.offset(),
      limit: request.limit()
    };
    const credencial = request.auth.credentials.id;
    const values = await model.scope({method: ['empresa', credencial]}).findAndCountAll(request.fieldsAll(options));
    return reply(values).header('allowing-fields', request.fieldsHeaders(options));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function create (request, reply) {
  try {
    const database = request.database;
    const model = database.CardapioPratoPorcao;
    const credencial = request.auth.credentials.id;
    const payload = request.payload;
    const cardapioPrato = database.CardapioPrato;
    const prato = database.Prato;
    const findPrato = await cardapioPrato.findOne({where: {idcardapio_prato: request.payload.idcardapio_prato}});
    const findPorcao = await prato.findOne({ where: {idprato: findPrato.idprato} });
    const countPorcao = await model.sum('qt_porcao', { where: {idcardapio_prato: request.payload.idcardapio_prato, idempresa: credencial} });
    console.log(findPorcao.qt_porcao, countPorcao, request.payload.qt_porcao);
    if (findPorcao.qt_porcao < ((countPorcao || 0) + request.payload.qt_porcao)) {
      return reply.illegal('Quantidade superior a capacidade!');
    }

    const itemPorcao = database.ItemPorcao;
    const itemPorcaoFind = await itemPorcao.findOne({ where: {iditem_porcao: request.payload.iditem_porcao, idempresa: credencial} });
    if (!itemPorcaoFind) {
      return reply.notFound('Item não encontrado.');
    }
    request.payload.iditem_porcao = itemPorcaoFind.iditem_porcao;
    request.payload.vl_porcao = itemPorcaoFind.vl_porcao;
    payload.idempresa = request.auth.credentials.id;
    const value = await model.create(request.payload);
    return reply({ idcardapio_prato_porcao: value.idcardapio_prato_porcao, idcardapio_prato: value.idcardapio_prato, iditem_porcao: value.iditem_porcao });
  } catch (err) {
    console.log(err);
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.CardapioPratoPorcao;
    // const idcardapio_prato = request.params.idcardapio_prato;
    // const item = request.params.item;
    const credencial = request.auth.credentials.id;
    const options = {
      where: {idcardapio_prato_porcao: request.params.idcardapio_prato_porcao},
      attributes: ['idcardapio_prato_porcao', 'idcardapio_prato', 'iditem_porcao', 'qt_porcao']
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
    const model = request.database.CardapioPratoPorcao;
    const idcardapioPratoPorcao = request.params.idcardapio_prato_porcao;
    const payload = request.payload;
    const credencial = request.auth.credentials.id;
    const value = await model.scope({method: ['empresa', credencial]}).findOne({where: {idcardapio_prato_porcao: idcardapioPratoPorcao}});
    if (!value) {
      return reply.notFound();
    }
    const valueUpdate = await value.update(payload, {where: {idcardapio_prato_porcao: idcardapioPratoPorcao}});
    return reply({idcardapio_prato_porcao: valueUpdate.idcardapio_prato_porcao});
    // return reply({idcardapio_prato_porcao: value.idcardapio_prato_porcao, idcardapio_prato: value.idcardapio_prato, item: value.item, numero_porcao: value.numero_porcao});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function destroy (request, reply) {
  try {
    const model = request.database.CardapioPratoPorcao;
    const idcardapioPratoPorcao = request.params.idcardapio_prato_porcao;
    const credencial = request.auth.credentials.id;
    const value = await model.findOne({where: {idcardapio_prato_porcao: idcardapioPratoPorcao, idempresa: credencial}});
    if (!value) {
      return reply.notFound();
    }
    await value.destroy();

    return reply({
      idcardapio_prato_porcao: value.idcardapio_prato_porcao,
      delete: true
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

function searchAll (search) {
  if (!search) return;
  return {
    cidade: {
      $ilike: '%' + search + '%'
    }
  };
}
