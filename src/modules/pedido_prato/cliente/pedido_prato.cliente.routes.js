const Controller = require('./pedido_prato.cliente.controller');
const Validator = require('./pedido_prato.cliente.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/pedido_prato/cliente',
      config: {
        description: 'GET pedido_prato',
        notes: 'Returns a pedido_prato',
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
      path: '/pedido_prato/cliente/{idpedidoprato}',
      config: {
        description: 'GET pedido_prato',
        notes: 'Returns a pedido_prato for idprato passed in the params',
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
      path: '/pedido_prato/cliente',
      config: {
        description: 'POST pedido_prato',
        notes: 'Save a pedido_prato',
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
      path: '/pedido_prato/cliente/{idpedidoprato}',
      config: {
        description: 'PUT pedido_prato',
        notes: 'Update the pedido_prato',
        tags: ['api', 'cliente'],
        auth: {
          scope: ['cliente']
        },
        handler: Controller.update,
        validate: Validator.update()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'pedido_prato-cliente-route',
  version: '1.0.0'
};

