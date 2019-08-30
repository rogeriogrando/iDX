// import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataType) => {
  const Cardapio = sequelize.define('Cardapio', {
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
    tableName: 'cardapio',
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
  Cardapio.associate = function (models) {
    Cardapio.belongsTo(models.Empresa, {
      foreignKey: 'idempresa'
    });
  };
  return Cardapio;
};
