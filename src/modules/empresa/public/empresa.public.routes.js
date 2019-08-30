'use strict';

const Controller = require('./empresa.public.controller');
const Validator = require('./empresa.public.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/empresa/public',
      config: {
        description: 'GET empresa',
        notes: 'Returns a empresa',
        tags: ['api', 'public'],
        auth: false,
        handler: Controller.list,
        validate: Validator.list()
      }
    },
    {
      method: 'GET',
      path: '/empresa/public/{id}',
      config: {
        description: 'GET empresa',
        notes: 'Returns a empresa for id passed in the params',
        tags: ['api', 'public'],
        auth: false,
        handler: Controller.read,
        validate: Validator.read()
      }
    },
    {
      method: 'POST',
      path: '/empresa/public',
      config: {
        description: 'POST empresa',
        notes: 'Save a empresa',
        tags: ['api', 'public'],
        auth: false,
        handler: Controller.create,
        validate: Validator.create()
      }
    },
    {
      method: 'POST',
      path: '/empresa/public/login',
      config: {
        description: 'POST empresa',
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
  name: 'empresa-public-route',
  version: '1.0.0'
};

