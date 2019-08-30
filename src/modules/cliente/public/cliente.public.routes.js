'use strict';

const Controller = require('./cliente.public.controller');
const Validator = require('./cliente.public.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'POST',
      path: '/cliente/public',
      config: {
        description: 'POST public',
        notes: 'Save a public',
        tags: ['api', 'public'],
        auth: false,
        handler: Controller.create,
        validate: Validator.create()
      }
    },

    {
      method: 'POST',
      path: '/cliente/public/login',
      config: {
        description: 'POST cliente',
        notes: 'User login to the token generation',
        tags: ['api', 'public'],
        auth: false,
        handler: Controller.login,
        validate: Validator.login()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'cliente-public-route',
  version: '1.0.0'
};
