const Controller = require('./pedido_prato_porcao.cliente.controller');
const Validator = require('./pedido_prato_porcao.cliente.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/pedido_prato_porcao/cliente',
      config: {
        description: 'GET pedido_prato_porcao',
        notes: 'Returns a pedido_prato_porcao',
        tags: ['api', 'cliente'],
        auth: {
          scope: ['cliente']
        },
        handler: Controller.list,
        validate: Validator.list()
      }
    },
    {
      method: 'GET',
      path: '/pedido_prato_porcao/cliente/{idpedido_prato_porcao}',
      config: {
        description: 'GET pedido_prato_porcao',
        notes: 'Returns a pedido_prato_porcao for idprato passed in the params',
        tags: ['api', 'cliente'],
        auth: {
          scope: ['cliente']
        },
        handler: Controller.read,
        validate: Validator.read()
      }
    },
    {
      method: 'POST',
      path: '/pedido_prato_porcao/cliente',
      config: {
        description: 'POST pedido_prato_porcao',
        notes: 'Save a pedido_prato_porcao',
        tags: ['api', 'cliente'],
        auth: {
          scope: ['cliente']
        },
        handler: Controller.create,
        validate: Validator.create()
      }
    },

    {
      method: 'PUT',
      path: '/pedido_prato_porcao/cliente/{idpedido_prato_porcao}',
      config: {
        description: 'PUT pedido_prato_porcao',
        notes: 'Update the pedido_prato_porcao',
        tags: ['api', 'cliente'],
        auth: {
          scope: ['cliente']
        },
        handler: Controller.update,
        validate: Validator.update()
      }
    },
    {
      method: 'DELETE',
      path: '/pedido_prato_porcao/cliente/{idpedido_prato_porcao}',
      config: {
        description: 'DELETE pedido_prato_porcao',
        notes: 'Delete the pedido_prato_porcao for id passed in the params',
        tags: ['api', 'cliente'],
        auth: {
          scope: ['cliente']
        },
        handler: Controller.destroy,
        validate: Validator.destroy()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'pedido_prato_porcao-cliente-route',
  version: '1.0.0'
};

