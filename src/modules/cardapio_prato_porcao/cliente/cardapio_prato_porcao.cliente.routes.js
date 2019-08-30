const Controller = require('./cardapio_prato_porcao.cliente.controller');
const Validator = require('./cardapio_prato_porcao.cliente.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/cardapio_prato_porcao/cliente/{idempresa}',
      config: {
        description: 'GET cardapio_prato_porcao',
        notes: 'Returns a cardapio_prato_porcao',
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
      path: '/cardapio_prato_porcao/cliente/{idempresa}/{idcardapio_prato_porcao}',
      config: {
        description: 'GET cardapio_prato_porcao',
        notes: 'Returns a cardapio_prato_porcao for idprato passed in the params',
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
  name: 'cardapio_prato_porcao-cliente-route',
  version: '1.0.0'
};

