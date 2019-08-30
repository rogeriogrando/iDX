const CardapioPrato = require('../../src/models/cardapio_prato.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const CardapioPrato = db.sequelize.define('CardapioPrato', {
    idcardapio_prato: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      field: 'idcardapio_prato'
    },
    idempresa: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'empresa',
        key: 'idempresa'
      }
    },
    idcardapio: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'cardapio',
        key: 'idcardapio'
      }
    },
    idprato: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'prato',
        key: 'idprato'
      }
    },
    descricao_prato: {
      type: DataType.STRING(255),
      allowNull: false,
      field: 'descricao_prato'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'cardapio_prato'
  });
  await CardapioPrato.sync();
}

async function down (db) {
  await CardapioPrato(db.sequelize, db.Sequelize).drop();
}
