const Controller = require('./item_porcao.empresa.controller');
const Validator = require('./item_porcao.empresa.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/item_porcao/empresa',
      config: {
        description: 'GET item_porcao',
        notes: 'Returns a item_porcao',
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
      path: '/item_porcao/empresa/{item}',
      config: {
        description: 'GET item_porcao',
        notes: 'Returns a item_porcao for idprato passed in the params',
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
      path: '/item_porcao/empresa',
      config: {
        description: 'POST item_porcao',
        notes: 'Save a item_porcao',
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
      path: '/item_porcao/empresa/{item}/{unidade_medida}',
      config: {
        description: 'PUT item_porcao',
        notes: 'Update the item_porcao',
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
      path: '/item_porcao/empresa/{item}',
      config: {
        description: 'DELETE item_porcao',
        notes: 'Delete the item_porcao for id passed in the params',
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
  name: 'item_porcao-empresa-route',
  version: '1.0.0'
};

