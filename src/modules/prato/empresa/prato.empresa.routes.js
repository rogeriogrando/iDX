const Controller = require('./prato.empresa.controller');
const Validator = require('./prato.empresa.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/prato/empresa',
      config: {
        description: 'GET prato',
        notes: 'Returns a prato',
        tags: ['api', 'empresa'],
        auth: {
          scope: ['empresa']
        },
        handler: Controller.list,
        validate: Validator.list()
      }
    },
    {
      method: 'GET',
      path: '/prato/empresa/{id}',
      config: {
        description: 'GET prato',
        notes: 'Returns a prato for id passed in the params',
        tags: ['api', 'empresa'],
        auth: {
          scope: ['empresa']
        },
        handler: Controller.read,
        validate: Validator.read()
      }
    },
    {
      method: 'POST',
      path: '/prato/empresa',
      config: {
        description: 'POST prato',
        notes: 'Save a prato',
        tags: ['api', 'empresa'],
        auth: {
          scope: ['empresa']
        },
        handler: Controller.create,
        validate: Validator.create()
      }
    },

    {
      method: 'PUT',
      path: '/prato/empresa/{id}',
      config: {
        description: 'PUT prato',
        notes: 'Update the prato',
        tags: ['api', 'empresa'],
        auth: {
          scope: ['empresa']
        },
        handler: Controller.update,
        validate: Validator.update()
      }
    },
    {
      method: 'DELETE',
      path: '/prato/empresa/{id}',
      config: {
        description: 'DELETE prato',
        notes: 'Delete the prato for id passed in the params',
        tags: ['api', 'empresa'],
        auth: {
          scope: ['empresa']
        },
        handler: Controller.destroy,
        validate: Validator.destroy()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'prato-empresa-route',
  version: '1.0.0'
};

