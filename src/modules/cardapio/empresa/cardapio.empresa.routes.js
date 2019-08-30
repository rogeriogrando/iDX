const Controller = require('./cardapio.empresa.controller');
const Validator = require('./cardapio.empresa.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/cardapio/empresa',
      config: {
        description: 'GET cardapio',
        notes: 'Returns a cardapio',
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
      path: '/cardapio/empresa/{dia}/{ativo}',
      config: {
        description: 'GET cardapio',
        notes: 'Returns a cardapio for idcardapio passed in the params',
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
      path: '/cardapio/empresa',
      config: {
        description: 'POST cardapio',
        notes: 'Save a cardapio',
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
      path: '/cardapio/empresa/{dia}/{ativo}',
      config: {
        description: 'PUT cardapio',
        notes: 'Update the cardapio',
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
      path: '/cardapio/empresa/{idcardapio}',
      config: {
        description: 'DELETE cardapio',
        notes: 'Delete the cardapio for idcardapio passed in the params',
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
  name: 'cardapio-empresa-route',
  version: '1.0.0'
};
