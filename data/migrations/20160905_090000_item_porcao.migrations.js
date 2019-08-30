const ItemPorcao = require('../../src/models/item_porcao.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const ItemPorcao = db.sequelize.define('ItemPorcao', {
    iditem_porcao: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'iditem_porcao'
    },
    idempresa: {
      type: DataType.INTEGER,
      references: {
        model: 'empresa',
        key: 'idempresa'
      },
      unique: 'uq_item_porcao'
    },
    unidade_medida: {
      type: DataType.STRING(2),
      allowNull: false,
      field: 'unidade_medida',
      unique: 'uq_item_porcao'
    },
    item: {
      type: DataType.STRING(50),
      allowNull: false,
      field: 'item',
      unique: 'uq_item_porcao'
    },
    qt_porcao: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'qt_porcao'
    },
    vl_porcao: {
      type: DataType.DECIMAL(20, 2),
      allowNull: false,
      field: 'vl_porcao'
    }

  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'item_porcao'
  });
  await ItemPorcao.sync();
}

async function down (db) {
  await ItemPorcao(db.sequelize, db.Sequelize).drop();
}
