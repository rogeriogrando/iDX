// import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataType) => {
  const PedidoPrato = sequelize.define('PedidoPrato', {
    idpedidoprato: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idpedido: {
      type: DataType.INTEGER,
      references: {
        model: 'pedido',
        key: 'idpedido'
      },
      field: 'idpedido'
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
  PedidoPrato.associate = function (models) {
    PedidoPrato.belongsTo(models.Pedido, {
      foreignKey: 'idpedido'
    });
    PedidoPrato.belongsTo(models.Empresa, {
      foreignKey: 'idempresa'
    });
  };
  return PedidoPrato;
};
