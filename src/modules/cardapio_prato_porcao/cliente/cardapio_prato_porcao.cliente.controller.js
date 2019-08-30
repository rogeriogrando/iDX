'use strict';

module.exports = {
  list: list,
  read: read
};

async function list (request, reply) {
  try {
    const model = request.database.CardapioPratoPorcao;
    const Op = request.database.Sequelize.Op;
    const idempresa = request.params.idempresa;
    const options = {
      attributes: ['idcardapio_prato_porcao', 'idcardapio_prato', 'iditem_porcao', 'qt_porcao'],
      where: searchAll(request.query.search, Op, idempresa),
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

async function read (request, reply) {
  try {
    const model = request.database.CardapioPratoPorcao;
    // const idcardapio_prato = request.params.idcardapio_prato;
    // const item = request.params.item;
    // const Op = request.database.Sequelize.Op;
    const idempresa = request.params.idempresa;
    const options = {
      // where: searchAll(request.query.search, Op, idempresa),
      where: {idcardapio_prato_porcao: request.params.idcardapio_prato_porcao, idempresa: idempresa},
      attributes: ['idcardapio_prato_porcao', 'idcardapio_prato', 'iditem_porcao', 'qt_porcao']
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

function searchAll (search, Op, idempresa) {
  const where = {
    idempresa: {
      [Op.eq]: idempresa
    }
  };
  console.log(search);
  if (search) {
    where.dia = {
      [Op.iLike]: '%' + search + '%'
    };
  }
  return where;
}
