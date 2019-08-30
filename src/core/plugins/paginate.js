exports.register = (server, options, next) => {
  const limitDefault = options.limit || 5;
  const limit = function () {
    return this.query.limit || limitDefault;
  };

  const offset = function () {
    let page = this.query.page || 1;
    if (page > 1) {
      return this.query.limit * (page - 1);
    } else {
      if (this.query.offset > 0) {
        return this.query.offset;
      }
    }
    return 0;
  };

  server.decorate('request', 'offset', offset);
  server.decorate('request', 'limit', limit);

  next();
};

exports.register.attributes = {
  name: 'hapi-paginate',
  version: '1.0.0'
};
