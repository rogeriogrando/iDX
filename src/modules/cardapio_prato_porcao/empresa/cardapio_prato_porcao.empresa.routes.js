const Controller = require('./cardapio_prato_porcao.empresa.controller');
const Validator = require('./cardapio_prato_porcao.empresa.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/cardapio_prato_porcao/empresa',
      config: {
        description: 'GET cardapio_prato_porcao',
        notes: 'Returns a cardapio_prato_porcao',
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
      path: '/cardapio_prato_porcao/empresa/{idcardapio_prato_porcao}',
      config: {
        description: 'GET cardapio_prato_porcao',
        notes: 'Returns a cardapio_prato_porcao for idprato passed in the params',
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
      path: '/cardapio_prato_porcao/empresa',
      config: {
        description: 'POST cardapio_prato_porcao',
        notes: 'Save a cardapio_prato_porcao',
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
      path: '/cardapio_prato_porcao/empresa/{idcardapio_prato_porcao}',
      config: {
        description: 'PUT cardapio_prato_porcao',
        notes: 'Update the cardapio_prato_porcao',
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
      path: '/cardapio_prato_porcao/empresa/{idcardapio_prato_porcao}',
      config: {
        description: 'DELETE cardapio_prato_porcao',
        notes: 'Delete the cardapio_prato_porcao for id passed in the params',
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
  name: 'cardapio_prato_porcao-empresa-route',
  version: '1.0.0'
};

