const Cardapio = require('../../src/models/cardapio.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const Cardapio = db.sequelize.define('Cardapio', {
    idcardapio: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      field: 'idcardapio'
    },
    idempresa: {
      type: DataType.INTEGER,
      references: {
        model: 'empresa',
        key: 'idempresa'
      }
    },
    dia: {
      type: DataType.STRING(20),
      allowNull: false,
      field: 'dia'
    },
    ativo: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'ativo'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'cardapio'
  });
  await Cardapio.sync();
}

async function down (db) {
  await Cardapio(db.sequelize, db.Sequelize).drop();
}
