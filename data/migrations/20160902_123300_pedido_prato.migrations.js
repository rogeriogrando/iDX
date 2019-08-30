const PedidoPrato = require('../../src/models/pedido_prato.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const PedidoPrato = db.sequelize.define('PedidoPrato', {
    idpedidoprato: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    idpedido: {
      type: DataType.INTEGER,
      references: {
        model: 'pedido',
        key: 'idpedido'
      },
      field: 'idpedido'
    },
    tamanho: {
      type: DataType.STRING(1),
      allowNull: false,
      field: 'tamanho'
    },
    qt_porcao: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'qt_porcao'
    },
    descricao: {
      type: DataType.STRING(255),
      allowNull: false,
      field: 'descricao'
    },
    quantidade: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'quantidade'
    },
    quantidade_cancelada: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'pedido_prato'
  });
  await PedidoPrato.sync();
}

async function down (db) {
  await PedidoPrato(db.sequelize, db.Sequelize).drop();
}
