const Controller = require('./cardapio.cliente.controller');
const Validator = require('./cardapio.cliente.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/cardapio/cliente/{idempresa}',
      config: {
        description: 'GET cardapio',
        notes: 'Returns a cardapio',
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
      path: '/cardapio/cliente/{idempresa}/{dia}',
      config: {
        description: 'GET cardapio',
        notes: 'Returns a cardapio for idcardapio passed in the params',
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
  name: 'cardapio-cliente-route',
  version: '1.0.0'
};
