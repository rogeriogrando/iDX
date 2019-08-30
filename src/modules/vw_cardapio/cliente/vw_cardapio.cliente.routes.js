const Controller = require('./vw_cardapio.cliente.controller');
const Validator = require('./vw_cardapio.cliente.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/vw_cardapio/cliente/{idempresa}',
      config: {
        description: 'GET vw_cardapio',
        notes: 'Returns a vw_cardapio',
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
      path: '/vw_cardapio/cliente/{idempresa}/{idcardapio}',
      config: {
        description: 'GET vw_cardapio',
        notes: 'Returns a vw_cardapio for idprato passed in the params',
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
  name: 'vw_cardapio-cliente-route',
  version: '1.0.0'
};

