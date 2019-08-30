const Pedido = require('../../src/models/pedido.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const Pedido = db.sequelize.define('Pedido', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      field: 'idpedido'
    },
    idcliente: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'idcliente'
    },
    idgrupo: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'idgrupo'
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
    cidade: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'cidade'
    },
    uf: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'uf'
    },
    datapedido: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.fn('now'),
      field: 'datapedido'
    },
    cep: {
      type: DataType.STRING(8),
      allowNull: false,
      field: 'cep'
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
    solicitado: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'solicitado'
    },
    feito: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'feito'
    },
    entregue: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'entregue'
    },
    cancelado_cli: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'cancelado_cli'
    },
    cancelado_emp: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'cancelado_emp'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'pedido'
  });
  await Pedido.sync();
}

async function down (db) {
  await Pedido(db.sequelize, db.Sequelize).drop();
}
