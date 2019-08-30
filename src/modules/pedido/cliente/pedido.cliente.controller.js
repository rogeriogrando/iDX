'use strict';

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update
};

async function list (request, reply) {
  try {
    const model = request.database.Pedido;
    const Op = request.database.Sequelize.Op;
    const database = request.database;
    const credencial = request.auth.credentials.id;
    const options = {
      attributes: ['id', 'idgrupo', 'idcliente', 'idempresa', 'datapedido', 'cep', 'uf', 'cidade', 'bairro', 'rua', 'numero', 'complemento', 'referencia', 'solicitado', 'feito', 'entregue', 'cancelado_emp', 'cancelado_cli'],
      include: [{
        model: database.Cliente,
        attributes: ['nome']
      }],
      where: searchAll(request.query.search, Op),
      offset: request.offset(),
      limit: request.limit()
    };
    const values = await model.scope({method: ['cliente', credencial]}).findAndCountAll(options);
    // const values = await model.findAndCountAll(request.fieldsAll(options));
    return reply(values).header('allowing-fields', request.fieldsHeaders(options));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function create (request, reply) {
  try {
    const database = request.database;
    const credencial = request.auth.credentials.id;
    const model = database.Pedido;
    const payload = request.payload;
    const cliente = database.Cliente;

    if (!cliente) {
      return reply.notFound('Cliente não encontrado.');
    }

    const grupo = database.Grupo;
    if (!grupo) {
      return reply.notFound('Grupo não encontrado.');
    }
    payload.idcliente = credencial;
    const value = await model.create(payload);
    return reply({ id: value.id });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.Pedido;
    const credencial = request.auth.credentials.id;
    // const dataInicial = request.query.dataInicial;
    // const dataFinal = request.query.dataFinal;
    const options = {
      where: {
        idcliente: credencial
        /*
        ,
        datapedido: {
          $between: [dataInicial, dataFinal]
        }
        */
      },
      attributes: ['id', 'idcliente', 'idgrupo', 'idempresa', 'datapedido']
    };

    const values = await model.findAndCountAll(request.fieldsAll(options));
    if (!values) {
      return reply.notFound();
    }
    return reply(values);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function update (request, reply) {
  try {
    const model = request.database.Pedido;
    const id = request.params.id;
    const payload = request.payload;
    const value = await model.findOne({where: {id: id}});

    if (!value) {
      return reply.notFound();
    }
    const valueUpdate = await value.update(payload, {where: {id: id}});
    return reply({id: valueUpdate.id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

function searchAll (search) {
  if (!search) return;
  return {
    nome: {
      $ilike: '%' + search + '%'
    }
  };
}
