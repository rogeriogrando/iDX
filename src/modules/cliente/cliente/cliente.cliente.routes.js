const Controller = require('./cliente.cliente.controller');
const Validator = require('./cliente.cliente.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/cliente/cliente',
      config: {
        description: 'GET cliente',
        notes: 'Returns a cliente',
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
      path: '/cliente/cliente_grupo',
      config: {
        description: 'GET cliente_grupo',
        notes: 'Returns a cliente_grupo',
        tags: ['api', 'cliente'],
        auth: {
          scope: ['cliente']
        },
        handler: Controller.listGrupos,
        validate: Validator.listGrupos()
      }
    },

    {
      method: 'GET',
      path: '/cliente/cliente/{id}',
      config: {
        description: 'GET cliente',
        notes: 'Returns a cliente for id passed in the params',
        tags: ['api', 'cliente'],
        auth: {
          scope: ['cliente']
        },
        handler: Controller.read,
        validate: Validator.read()
      }
    },

    {
      method: 'PUT',
      path: '/cliente/cliente/{id}',
      config: {
        description: 'PUT cliente',
        notes: 'Update the cliente',
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
      path: '/cliente/cliente/{id}',
      config: {
        description: 'DELETE cliente',
        notes: 'Delete the cliente for id passed in the params',
        tags: ['api', 'cliente'],
        auth: {
          scope: ['cliente']
        },
        handler: Controller.destroy,
        validate: Validator.destroy()
      }
    },
    {
      method: 'POST',
      path: '/cliente/cliente/logout',
      config: {
        description: 'POST cliente logout',
        notes: 'Logout a cliente',
        tags: ['api', 'cliente'],
        auth: {
          scope: ['cliente']
        },
        handler: Controller.logout,
        validate: Validator.logout()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'cliente-cliente-route',
  version: '1.0.0'
};
