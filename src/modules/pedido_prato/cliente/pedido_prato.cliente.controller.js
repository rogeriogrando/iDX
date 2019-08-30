'use strict';

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update
};

async function list (request, reply) {
  try {
    const model = request.database.PedidoPrato;
    const options = {
      attributes: ['idpedidoprato', 'idpedido', 'tamanho', 'quantidade', 'quantidade_cancelada']
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
    const model = database.PedidoPrato;
    const prato = database.Prato;
    const pedido = database.Pedido;
    const empresa = await pedido.findOne({where: {id: request.payload.idpedido}});
    if (!empresa) {
      return reply.notFound('Pedido não encontrado.');
    }

    const tamanhoPrato = await prato.findOne({where: {id: request.payload.idprato}});
    if (!tamanhoPrato) {
      return reply.notFound('Opção de prato não encontrado.');
    }
    request.payload.idempresa = empresa.idempresa;
    request.payload.tamanho = tamanhoPrato.tamanho;
    const value = await model.create(request.payload);
    return reply({ idpedidoprato: value.idpedidoprato });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.PedidoPrato;
    const idpedidoprato = request.params.idpedidoprato;

    const options = {
      where: {idpedidoprato: idpedidoprato},
      attributes: ['idpedidoprato', 'idpedido', 'tamanho', 'quantidade', 'quantidade_cancelada']
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
    const model = request.database.PedidoPrato;
    const idpedidoprato = request.params.idpedidoprato;
    const payload = request.payload;
    const value = await model.findOne({where: {idpedidoprato: idpedidoprato}});
    if (!value) {
      return reply.notFound();
    }
    const valueUpdate = await value.update(payload, {where: {idpedidoprato: idpedidoprato}});
    return reply({idpedidoprato: valueUpdate.idpedidoprato});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}
