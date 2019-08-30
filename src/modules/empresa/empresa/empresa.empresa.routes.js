const Controller = require('./empresa.empresa.controller');
const Validator = require('./empresa.empresa.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/empresa/empresa',
      config: {
        description: 'GET empresa',
        notes: 'Returns a empresa',
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
      path: '/empresa/empresa/{id}',
      config: {
        description: 'GET empresa',
        notes: 'Returns a empresa for id passed in the params',
        tags: ['api', 'empresa'],
        auth: {
          scope: ['empresa']
        },
        handler: Controller.read,
        validate: Validator.read()
      }
    },

    {
      method: 'PUT',
      path: '/empresa/empresa/{id}',
      config: {
        description: 'PUT empresa',
        notes: 'Update the empresa',
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
      path: '/empresa/empresa/{id}',
      config: {
        description: 'DELETE empresa',
        notes: 'Delete the empresa for id passed in the params',
        tags: ['api', 'empresa'],
        auth: {
          scope: ['empresa']
        },
        handler: Controller.destroy,
        validate: Validator.destroy()
      }
    },
    {
      method: 'POST',
      path: '/empresa/empresa/logout',
      config: {
        description: 'POST empresa logout',
        notes: 'Logout a empresa',
        tags: ['api', 'empresa'],
        auth: {
          scope: ['empresa']
        },
        handler: Controller.logout,
        validate: Validator.logout()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'empresa-empresa-route',
  version: '1.0.0'
};

