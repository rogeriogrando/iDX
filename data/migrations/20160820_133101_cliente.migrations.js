const Cliente = require('../../src/models/cliente.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const Cliente = db.sequelize.define('Cliente', {
    email: {
      type: DataType.STRING(120),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataType.STRING(60),
      allowNull: false
    },
    nome: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'nome'
    },
    ddd: {
      type: DataType.STRING(2),
      allowNull: false,
      field: 'ddd'
    },
    telefone: {
      type: DataType.STRING(9),
      allowNull: false,
      field: 'telefone'
    },
    tipotelefone: {
      type: DataType.STRING(20),
      allowNull: false,
      field: 'tipotelefone'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'cliente'
  });
  await Cliente.sync();
}
async function down (db) {
  await Cliente(db.sequelize, db.Sequelize).drop();
}
