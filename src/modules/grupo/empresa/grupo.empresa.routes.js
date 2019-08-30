const Controller = require('./grupo.empresa.controller');
const Validator = require('./grupo.empresa.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/grupo/empresa',
      config: {
        description: 'GET grupo',
        notes: 'Returns a grupo',
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
      path: '/grupo/empresa/{id}',
      config: {
        description: 'GET grupo',
        notes: 'Returns a grupo for id passed in the params',
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
      path: '/grupo/empresa',
      config: {
        description: 'POST grupo',
        notes: 'Save a grupo',
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
      path: '/grupo/empresa/{id}',
      config: {
        description: 'PUT grupo',
        notes: 'Update the grupo',
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
      path: '/grupo/empresa/{id}',
      config: {
        description: 'DELETE grupo',
        notes: 'Delete the grupo for id passed in the params',
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
  name: 'grupo-empresa-route',
  version: '1.0.0'
};

