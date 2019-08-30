'use strict';

module.exports = {
  list: list,
  read: read
};

async function list (request, reply) {
  try {
    const model = request.database.CardapioPrato;
    const idempresa = request.params.idempresa;
    const database = request.database;
    const Op = request.database.Sequelize.Op;
    return reply(await model.findAndCountAll({
      attributes: ['idcardapio_prato', 'idcardapio', 'idprato', 'idempresa', 'descricao_prato'],
      include: [{
        model: database.Empresa,
        attributes: ['nomefantasia']
      }],
      where: searchAll(request.query.search, Op, idempresa),
      offset: request.offset(),
      limit: request.limit()
    }));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.CardapioPrato;
    const idempresa = request.params.idempresa;
    const idcardapioprato = request.params.idcardapio_prato;
    const options = {
      where: {idcardapio_prato: idcardapioprato, idempresa: idempresa},
      attributes: ['idcardapio_prato', 'idcardapio', 'idprato', 'idempresa', 'descricao_prato']
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
