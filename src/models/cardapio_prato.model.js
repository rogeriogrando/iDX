// import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataType) => {
  const CardapioPrato = sequelize.define('CardapioPrato', {
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
    tableName: 'cardapio_prato',
    scopes: {
      empresa: (id) => {
        return {
          where: {
            idempresa: id
          }
        };
      }
    }
  });
  CardapioPrato.associate = function (models) {
    CardapioPrato.belongsTo(models.Cardapio, {
      foreignKey: 'idcardapio'
    });
    CardapioPrato.belongsTo(models.Empresa, {
      foreignKey: 'idempresa'
    });
    CardapioPrato.belongsTo(models.Prato, {
      foreignKey: 'idprato'
    });
  };
  return CardapioPrato;
};
