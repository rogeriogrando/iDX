'use strict';

const Promise = require('bluebird');

module.exports = {
  getTokenEmpresa: getTokenEmpresa,
  getTokenCliente: getTokenCliente
};

function getTokenEmpresa (server) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: '/empresa/public/login',
      payload: {
        email: 'emp@emp.com.br',
        password: 'emp123'
      }
    };
    server.inject(options, (response) => {
      const context = {
        token: response.result.token
      };
      resolve(context);
    });
  });
}

function getTokenCliente (server) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: '/cliente/public/login',
      payload: {
        email: 'cli@cli.com.br',
        password: 'cli123'
      }
    };
    server.inject(options, (response) => {
      const context = {
        token: response.result.token
      };
      resolve(context);
    });
  });
}
