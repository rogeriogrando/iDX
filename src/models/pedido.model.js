// import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataType) => {
  const Pedido = sequelize.define('Pedido', {
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
    datapedido: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
      field: 'datapedido'
    },
    cep: {
      type: DataType.STRING(8),
      allowNull: false,
      field: 'cep'
    },
    uf: {
      type: DataType.STRING(60),
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
    tableName: 'pedido',

    scopes: {
      cliente: (id) => {
        return {
          where: {
            idcliente: id
          }
        };
      }
    }
  });
  Pedido.associate = function (models) {
    Pedido.belongsTo(models.Cliente, {
      foreignKey: 'idcliente'
    });
    Pedido.belongsTo(models.Grupo, {
      foreignKey: 'idgrupo'
    });
    Pedido.belongsTo(models.Empresa, {
      foreignKey: 'idempresa'
    });
  };
  return Pedido;
};
