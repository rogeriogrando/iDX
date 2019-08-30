const Controller = require('./grupo_cliente.cliente.controller');
const Validator = require('./grupo_cliente.cliente.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/grupo_cliente/cliente',
      config: {
        description: 'GET grupo_cliente',
        notes: 'Returns a grupo_cliente',
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
      path: '/grupo_cliente/cliente/{id}',
      config: {
        description: 'GET grupo_cliente',
        notes: 'Returns a grupo_cliente for id passed in the params',
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
      path: '/grupo_cliente/cliente',
      config: {
        description: 'POST grupo_cliente',
        notes: 'Save a grupo_cliente',
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
      path: '/grupo_cliente/cliente/{id}',
      config: {
        description: 'PUT grupo_cliente',
        notes: 'Update the grupo_cliente',
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
      path: '/grupo_cliente/cliente/{id}',
      config: {
        description: 'DELETE grupo_cliente',
        notes: 'Delete the grupo_cliente for id passed in the params',
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
  name: 'grupo_cliente-cliente-route',
  version: '1.0.0'
};

