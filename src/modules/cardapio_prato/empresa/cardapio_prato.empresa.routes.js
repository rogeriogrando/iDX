const Controller = require('./cardapio_prato.empresa.controller');
const Validator = require('./cardapio_prato.empresa.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/cardapio_prato/empresa',
      config: {
        description: 'GET cardapio_prato',
        notes: 'Returns a cardapio_prato',
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
      path: '/cardapio_prato/empresa/{idcardapio_prato}',
      config: {
        description: 'GET cardapio_prato',
        notes: 'Returns a cardapio_prato for idprato passed in the params',
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
      path: '/cardapio_prato/empresa/{idcardapio_prato}',
      config: {
        description: 'PUT cardapio_prato',
        notes: 'Update the cardapio_prato',
        tags: ['api', 'empresa'],
        auth: {
          scope: ['empresa']
        },
        handler: Controller.update,
        validate: Validator.update()
      }
    },
    {
      method: 'POST',
      path: '/cardapio_prato/empresa',
      config: {
        description: 'POST cardapio_prato',
        notes: 'Save a cardapio_prato',
        tags: ['api', 'empresa'],
        auth: {
          scope: ['empresa']
        },
        handler: Controller.create,
        validate: Validator.create()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'cardapio_prato-empresa-route',
  version: '1.0.0'
};

