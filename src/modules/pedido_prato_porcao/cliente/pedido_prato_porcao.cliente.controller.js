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
    const model = request.database.PedidoPratoPorcao;
    const Op = request.database.Sequelize.Op;
    const options = {
      attributes: ['idpedido_prato_porcao', 'idpedidoprato', 'item', 'qt_porcao_item', 'vl_porcao'],
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
    const model = database.PedidoPratoPorcao;

    const pedidoPrato = database.PedidoPrato;
    const cadPrato = await pedidoPrato.findOne({where: {idpedidoprato: request.payload.idpedidoprato}});
    if (!cadPrato) {
      return reply.notFound('Prato não encontrado.');
    }

    const itemPorcao = database.ItemPorcao;
    const itemPorcaoFind = await itemPorcao.findOne({ where: {iditem_porcao: request.payload.iditem_porcao} });
    if (!itemPorcaoFind) {
      return reply.notFound('Item não encontrado.');
    }
    console.log(itemPorcaoFind.item);
    request.payload.idempresa = cadPrato.idempresa;
    request.payload.item = itemPorcaoFind.item;
    request.payload.vl_porcao = itemPorcaoFind.vl_porcao;

    const value = await model.create(request.payload);
    return reply({ idpedido_prato_porcao: value.idpedido_prato_porcao, idpedidoprato: value.idpedidoprato });
  } catch (err) {
    console.log(err);
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.PedidoPratoPorcao;
    const idpedidoPratoPorcao = request.params.idpedido_prato_porcao;
    const options = {
      where: { idpedido_prato_porcao: idpedidoPratoPorcao },
      attributes: ['idpedido_prato_porcao', 'idpedidoprato', 'item', 'qt_porcao_item', 'vl_porcao']
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
    const database = request.database;
    const model = database.PedidoPratoPorcao;
    const idpedidoPratoPorcao = request.params.idpedido_prato_porcao;
    // const payload = request.payload;
    const value = await model.findOne({where: { idpedido_prato_porcao: idpedidoPratoPorcao }});

    if (!value) {
      return reply.notFound();
    }

    const pedidoPrato = database.PedidoPrato;
    const cadPratoPorcao = await pedidoPrato.findOne({where: {idpedidoprato: request.payload.idpedidoprato}});
    if (!cadPratoPorcao) {
      return reply.notFound('Pedido Prato não encontrada.');
    }
    console.log(cadPratoPorcao);
    const quantPorcao = cadPratoPorcao.qt_porcao;
    const countPorcao = await model.sum('qt_porcao_item', {
      where: {
        idpedidoprato: {
          $eq: request.payload.idpedidoprato
        },
        idpedido_prato_porcao: {
          $ne: cadPratoPorcao
        }
      }
    });
    console.log(quantPorcao, countPorcao, request.payload.qt_porcao_item);
    if (quantPorcao < (countPorcao + request.payload.qt_porcao_item)) {
      return reply.illegal('Quantidade superior a capacidade!');
    }

    // const valueUpdate = await value.update(payload, {where: { idpedido_prato_porcao: idpedido_prato_porcao }});
    return reply({idpedido_prato_porcao: value.idpedido_prato_porcao, idpedidoprato: value.idpedidoprato});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function destroy (request, reply) {
  try {
    const model = request.database.PedidoPratoPorcao;
    const idpedidoPratoPorcao = request.params.idpedido_prato_porcao;
    const value = await model.findOne({where: { idpedido_prato_porcao: idpedidoPratoPorcao }});
    if (!value) {
      return reply.notFound();
    }

    await value.destroy();

    return reply({
      idpedido_prato_porcao: value.idpedido_prato_porcao,
      delete: true
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

function searchAll (search) {
  if (!search) return;
  return {
    item: {
      $ilike: '%' + search + '%'
    }
  };
}
