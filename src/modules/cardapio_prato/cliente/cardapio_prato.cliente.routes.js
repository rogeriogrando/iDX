const Controller = require('./cardapio_prato.cliente.controller');
const Validator = require('./cardapio_prato.cliente.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/cardapio_prato/cliente/{idempresa}',
      config: {
        description: 'GET cardapio_prato',
        notes: 'Returns a cardapio_prato for idprato passed in the params',
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
      path: '/cardapio_prato/cliente/{idempresa}/{idcardapio_prato}',
      config: {
        description: 'GET cardapio_prato',
        notes: 'Returns a cardapio_prato for idprato passed in the params',
        tags: ['api', 'cliente'],
        auth: {
          scope: ['cliente']
        },
        handler: Controller.read,
        validate: Validator.read()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'cardapio_prato-cliente-route',
  version: '1.0.0'
};

