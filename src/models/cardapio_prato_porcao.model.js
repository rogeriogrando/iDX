// import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataType) => {
  const CardapioPratoPorcao = sequelize.define('CardapioPratoPorcao', {
    idcardapio_prato_porcao: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idcardapio_prato_porcao'
    },
    idempresa: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'empresa',
        key: 'idempresa'
      },
      unique: 'uq_idcardapio_prato_porcao'
    },
    idcardapio_prato: {
      type: DataType.INTEGER,
      references: {
        model: 'cardapio_prato',
        key: 'idcardapio_prato'
      },
      unique: 'uq_idcardapio_prato_porcao'
    },
    iditem_porcao: {
      type: DataType.INTEGER,
      references: {
        model: 'item_porcao',
        key: 'iditem_porcao'
      },
      unique: 'uq_idcardapio_prato_porcao'
    },
    qt_porcao: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'qt_porcao'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'cardapio_prato_porcao',
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
  CardapioPratoPorcao.associate = function (models) {
    CardapioPratoPorcao.belongsTo(models.CardapioPrato, {
      foreignKey: 'idcardapio_prato'
    });
  };
  return CardapioPratoPorcao;
};
