const Controller = require('./grupo.cliente.controller');
const Validator = require('./grupo.cliente.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/grupo/cliente',
      config: {
        description: 'GET grupo',
        notes: 'Returns a grupo',
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
      path: '/grupo/cliente/{id}',
      config: {
        description: 'GET grupo',
        notes: 'Returns a grupo for id passed in the params',
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
      path: '/grupo/cliente',
      config: {
        description: 'POST grupo',
        notes: 'Save a grupo',
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
      path: '/grupo/cliente/{id}',
      config: {
        description: 'PUT grupo',
        notes: 'Update the grupo',
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
      path: '/grupo/cliente/{id}',
      config: {
        description: 'DELETE grupo',
        notes: 'Delete the grupo for id passed in the params',
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
  name: 'grupo-cliente-route',
  version: '1.0.0'
};

