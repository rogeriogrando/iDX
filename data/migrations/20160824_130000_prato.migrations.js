const Prato = require('../../src/models/prato.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const Prato = db.sequelize.define('Prato', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      field: 'idprato'
    },
    idempresa: {
      type: DataType.INTEGER,
      references: {
        model: 'empresa',
        key: 'idempresa'
      },
      unique: 'uq_prato'
    },
    tamanho: {
      type: DataType.STRING(1),
      allowNull: false,
      field: 'tamanho',
      unique: 'uq_prato'
    },
    descricao: {
      type: DataType.STRING(255),
      allowNull: false,
      field: 'descricao',
      unique: 'uq_prato'
    },
    qt_porcao: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'qt_porcao'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'prato'
  });
  await Prato.sync();
}

async function down (db) {
  await Prato(db.sequelize, db.Sequelize).drop();
}
