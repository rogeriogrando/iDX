module.exports = (sequelize, DataType) => {
  const ItemPorcao = sequelize.define('ItemPorcao', {
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
    tableName: 'item_porcao',
    classMethods: {
      associate: (models) => {
        ItemPorcao.belongsTo(models.Empresa, {
          foreignKey: 'idempresa'
        });
      }
    },
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

  return ItemPorcao;
};
