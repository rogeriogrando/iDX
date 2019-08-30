'use strict';

module.exports = {
  list: list,
  read: read
};

async function list (request, reply) {
  try {
    const model = request.database.Cardapio;
    const idempresa = request.params.idempresa;
    const database = request.database;
    const Op = request.database.Sequelize.Op;
    return reply(await model.findAndCountAll({
      attributes: ['idcardapio', 'idempresa', 'dia', 'ativo'],
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
    const model = request.database.Cardapio;
    const database = request.database;
    const dia = request.params.dia;
    const idempresa = request.params.idempresa;
    const options = {
      where: {dia: dia, ativo: 'true', idempresa: idempresa},
      attributes: ['idcardapio', 'idempresa', 'dia'],
      include: [{
        model: database.Empresa,
        attributes: ['nomefantasia']
      }]
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
