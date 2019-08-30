// import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataType) => {
  const Prato = sequelize.define('Prato', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      field: 'idprato'
    },
    idempresa: {
      type: DataType.INTEGER,
      references: {
        model: 'empresa',
        key: 'idempresa'
      },
      unique: 'uq_prato'
    },
    tamanho: {
      type: DataType.STRING(1),
      allowNull: false,
      field: 'tamanho',
      unique: 'uq_prato'
    },
    descricao: {
      type: DataType.STRING(255),
      allowNull: false,
      field: 'descricao',
      unique: 'uq_prato'
    },
    qt_porcao: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'qt_porcao'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'prato',
    scopes: {
      empresa: (id) => {
        return {
          where: {
            idempresa: id
          }
        };
      },
      cliente: (id) => {
        return {
          where: {
            idcliente: id
          }
        };
      }
    }
  });
  Prato.associate = function (models) {
    Prato.belongsTo(models.Empresa, {
      foreignKey: 'idempresa'
    });
  };
  return Prato;
};
