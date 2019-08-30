'use strict';

module.exports = {
  list: list,
  read: read,
  update: update,
  destroy: destroy
};

async function list (request, reply) {
  try {
    const model = request.database.ClienteEndereco;
    const credencial = request.auth.credentials.id;
    return reply(await model.scope({method: ['cliente', credencial]}).findAll({
      attributes: ['cep', 'uf', 'cidade', 'bairro', 'rua', 'numero', 'complemento', 'referencia', 'principal']
    }));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function read (request, reply) {
  try {
    const model = request.database.ClienteEndereco;
    const credencial = request.auth.credentials.id;
    const options = {
      where: {idcliente: credencial},
      attributes: ['cep', 'uf', 'cidade', 'bairro', 'rua', 'numero', 'complemento', 'referencia', 'principal']
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
    const model = request.database.ClienteEndereco;
    const credencial = request.auth.credentials.id;
    const payload = request.payload;
    const value = await model.findOne({where: {idcliente: credencial}});
    if (!value) {
      return reply.notFound();
    }
    const valueUpdate = await value.update(payload, {where: {idcliente: credencial}});
    return reply({idcliente: valueUpdate.id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function destroy (request, reply) {
  try {
    const model = request.database.ClienteEndereco;
    const credencial = request.auth.credentials.id;
    await model.destroy({where: {idcliente: credencial}});
    return reply({
      id: credencial,
      delete: true
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}
