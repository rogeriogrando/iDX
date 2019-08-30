'use strict';

module.exports = {
  list: list,
  read: read
};

async function list (request, reply) {
  try {
    const model = request.database.VwCardapio;
    const Op = request.database.Sequelize.Op;
    const idempresa = request.params.idempresa;
    const options = {
      attributes: ['idempresa', 'idcardapio', 'idcardapio_prato', 'idcardapio_prato_porcao', 'iditem_porcao', 'idprato', 'nomefantasia', 'cidade', 'uf', 'bairro', 'rua', 'complemento', 'referencia', 'dia', 'descricao_prato', 'item', 'vl_porcao'],
      where: searchAll(request.query.search, Op, idempresa),
      offset: request.offset(),
      limit: request.limit()
    };
    const values = await model.findAndCountAll(request.fieldsAll(options));
    return reply(values).header('allowing-fields', request.fieldsHeaders(options));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.VwCardapio;
    // const idcardapio_prato = request.params.idcardapio_prato;
    // const item = request.params.item;
    const Op = request.database.Sequelize.Op;
    const idempresa = request.params.idempresa;
    const idcardapio = request.params.idcardapio;
    const options = {
      where: searchAll(request.query.search, Op, idempresa, idcardapio),
      attributes: ['idempresa', 'idcardapio', 'idcardapio_prato', 'idcardapio_prato_porcao', 'iditem_porcao', 'idprato', 'nomefantasia', 'cidade', 'uf', 'bairro', 'rua', 'complemento', 'referencia', 'dia', 'descricao_prato', 'item', 'vl_porcao']
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

function searchAll (search, Op, idempresa, idcardapio) {
  const where = {
    idempresa: {
      [Op.eq]: idempresa
    },
    idcardapio: {
      [Op.eq]: idcardapio
    }
  };
  console.log(where);
  console.log(search);
  if (search) {
    where.dia = {
      [Op.iLike]: '%' + search + '%'
    };
  }
  return where;
}
