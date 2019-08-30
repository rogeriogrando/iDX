const Controller = require('./cliente_endereco.cliente.controller');
const Validator = require('./cliente_endereco.cliente.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/cliente_endereco/cliente',
      config: {
        description: 'GET cliente_endereco',
        notes: 'Returns a cliente_endereco',
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
      path: '/cliente_endereco/cliente/{id}',
      config: {
        description: 'GET cliente_endereco',
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
      path: '/cliente_endereco/cliente/{id}',
      config: {
        description: 'PUT cliente_endereco',
        notes: 'Update the cliente_endereco',
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
      path: '/cliente_endereco/cliente/{id}',
      config: {
        description: 'DELETE cliente_endereco',
        notes: 'Delete the cliente_endereco for id passed in the params',
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
  name: 'cliente_endereco-cliente-route',
  version: '1.0.0'
};
