const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataType) => {
  const Empresa = sequelize.define('Empresa', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      field: 'idempresa'
    },
    email: {
      type: DataType.STRING(120),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataType.STRING(60),
      allowNull: false
    },
    razao: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'razao'
    },
    nomefantasia: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'nomefantasia'
    },
    cnpj: {
      type: DataType.STRING(14),
      unique: true,
      allowNull: false,
      field: 'cnpj'
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
    },
    imagepath: {
      type: DataType.STRING(),
      field: 'imagepath'
    },
    sobre: {
      type: DataType.STRING(),
      field: 'sobre'
    },
    funcionamento: {
      type: DataType.STRING(),
      field: 'funcionamento'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'empresa',
    hooks: {
      beforeCreate: function (Empresa) {
        Empresa.set({
          password: hashPassword(Empresa.get('password'))
        });
      },
      beforeUpdate: function (Empresa) {
        if (!Empresa.changed('password')) {
          return;
        }
        Empresa.set({
          password: hashPassword(Empresa.get('password'))
        });
      }
    },
    classMethods: {
      associate: (models) => {
        Empresa.belongsToMany(models.Grupo, {
          through: models.Grupo_Empresa, foreignKey: 'EmpresaId', as: 'grupos'
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
  Empresa.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.get('password'));
  };
  return Empresa;
};

function hashPassword (password) {
  if (!password) {
    return false;
  }
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
