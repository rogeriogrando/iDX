'use strict';

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update
};

async function list (request, reply) {
  try {
    const model = request.database.CardapioPrato;
    const Op = request.database.Sequelize.Op;
    const database = request.database;
    const options = {
      attributes: ['idcardapio', 'idprato', 'idempresa', 'descricao_prato'],
      include: [{
        model: database.Cardapio,
        attributes: ['dia']
      }],
      where: searchAll(request.query.search, Op),
      order: ['idcardapio'],
      offset: request.offset(),
      limit: request.limit()
    };
    const credencial = request.auth.credentials.id;
    const values = await model.scope({method: ['empresa', credencial]}).findAndCountAll(options);
    return reply(values).header('allowing-fields', request.fieldsHeaders(options));
  } catch (err) {
    console.log(err);
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.CardapioPrato;
    const idcardapioprato = request.params.idcardapio_prato;
    const credencial = request.auth.credentials.id;
    const options = {
      where: {idcardapio_prato: idcardapioprato},
      attributes: ['idcardapio_prato', 'idcardapio', 'idprato', 'idempresa', 'descricao_prato']
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
    const model = request.database.CardapioPrato;
    const idcardapioprato = request.params.idcardapio_prato;
    const payload = request.payload;
    const credencial = request.auth.credentials.id;
    const value = await model.findOne({where: {idcardapio_prato: idcardapioprato, idempresa: credencial}});
    if (!value) {
      return reply.notFound();
    }
    const valueUpdate = await value.update(payload, {where: {idcardapio_prato: idcardapioprato, idempresa: credencial}});
    return reply({idcardapio_prato: valueUpdate.idcardapio_prato});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function create (request, reply) {
  try {
    const database = request.database;
    const model = database.CardapioPrato;
    const prato = database.Prato;
    const payload = request.payload;
    payload.idempresa = request.auth.credentials.id;
    const tamanhoPrato = await prato.findOne({where: {id: payload.idprato, idempresa: payload.idempresa}});
    if (!tamanhoPrato) {
      return reply.notFound('Opção de prato não encontrado.');
    }

    payload.tamanho = tamanhoPrato.tamanho;
    const value = await model.create(payload);
    return reply({ idcardapio_prato: value.idcardapio_prato });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

function searchAll (search, Op) {
  if (!search) return;
  return {
    descricao_prato: {
      [Op.iLike]: '%' + search + '%'
    }
  };
}
