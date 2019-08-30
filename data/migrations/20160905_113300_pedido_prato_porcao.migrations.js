const PedidoPratoPorcao = require('../../src/models/pedido_prato_porcao.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const PedidoPratoPorcao = db.sequelize.define('PedidoPratoPorcao', {
    idpedido_prato_porcao: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idpedidoprato: {
      type: DataType.INTEGER,
      references: {
        model: 'pedido_prato',
        key: 'idpedidoprato'
      },
      unique: 'uq_idpedido_prato_porcao'
    },
    idempresa: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'idempresa',
      references: {
        model: 'empresa',
        key: 'idempresa'
      }
    },
    item: {
      type: DataType.STRING(50),
      allowNull: false,
      field: 'item',
      unique: 'uq_idpedido_prato_porcao'
    },
    qt_porcao_item: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'qt_porcao_item'
    },
    vl_porcao: {
      type: DataType.DECIMAL(20, 2),
      allowNull: false,
      field: 'vl_porcao'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'pedido_prato_porcao'
  });
  await PedidoPratoPorcao.sync();
}

async function down (db) {
  await PedidoPratoPorcao(db.sequelize, db.Sequelize).drop();
}
