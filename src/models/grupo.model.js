// import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataType) => {
  const Grupo = sequelize.define('Grupo', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      field: 'idgrupo'
    },
    grupo: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'grupo'
    },
    cpf_cnpj: {
      type: DataType.STRING(14),
      unique: true,
      allowNull: false,
      field: 'cpf_cnpj'
    },
    cep: {
      type: DataType.STRING(8),
      allowNull: false,
      field: 'cep'
    },
    cidade: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'cidade'
    },
    uf: {
      type: DataType.STRING(2),
      allowNull: false,
      field: 'uf'
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
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'grupo'
  });
  Grupo.associate = function (models) {
    Grupo.belongsToMany(models.Cliente, {
      through: 'idcliente'
    });
    Grupo.belongsToMany(models.Empresa, {
      through: 'idempresa'
    });
  };
  return Grupo;
};
