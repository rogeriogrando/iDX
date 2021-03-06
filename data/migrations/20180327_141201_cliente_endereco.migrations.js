const ClienteEndereco = require('../../src/models/cliente_endereco.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const ClienteEndereco = db.sequelize.define('ClienteEndereco', {
    idcliente: {
      type: DataType.INTEGER,
      references: {
        model: 'cliente',
        key: 'id'
      },
      field: 'idcliente'
    },
    cep: {
      type: DataType.STRING(8),
      allowNull: false,
      field: 'cep'
    },
    uf: {
      type: DataType.STRING(2),
      allowNull: false,
      field: 'uf'
    },
    cidade: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'cidade'
    },
    bairro: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'bairro'
    },
    rua: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'rua'
    },
    numero: {
      type: DataType.STRING(10),
      allowNull: false,
      field: 'numero'
    },
    complemento: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'complemento'
    },
    referencia: {
      type: DataType.STRING(100),
      allowNull: false,
      field: 'referencia'
    },
    principal: {
      type: DataType.BOOLEAN,
      allowNull: false,
      field: 'principal'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'cliente_endereco'
  });
  await ClienteEndereco.sync();
}
async function down (db) {
  await ClienteEndereco(db.sequelize, db.Sequelize).drop();
}
