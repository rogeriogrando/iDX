const Controller = require('./pedido.cliente.controller');
const Validator = require('./pedido.cliente.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/pedido/cliente',
      config: {
        description: 'GET pedido',
        notes: 'Returns a pedido',
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
      path: '/pedido/cliente/periodo',
      config: {
        description: 'GET pedido',
        notes: 'Returns a pedido for id passed in the params',
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
      path: '/pedido/cliente',
      config: {
        description: 'POST pedido',
        notes: 'Save a pedido',
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
      path: '/pedido/cliente/{id}',
      config: {
        description: 'PUT pedido',
        notes: 'Update the pedido',
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
  name: 'pedido-cliente-route',
  version: '1.0.0'
};

