const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataType) => {
  const Cliente = sequelize.define('Cliente', {
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
    nome: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'nome'
    },
    ddd: {
      type: DataType.STRING(2),
      allowNull: false,
      field: 'ddd'
    },
    telefone: {
      type: DataType.STRING(9),
      allowNull: false,
      field: 'telefone'
    },
    tipotelefone: {
      type: DataType.STRING(20),
      allowNull: false,
      field: 'tipotelefone'
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'cliente',
    hooks: {
      beforeCreate: function (Cliente) {
        Cliente.set({
          password: hashPassword(Cliente.get('password'))
        });
      },
      beforeUpdate: function (Cliente) {
        if (!Cliente.changed('password')) {
          return;
        }
        Cliente.set({
          password: hashPassword(Cliente.get('password'))
        });
      }
    },
    classMethods: {
      associate: (models) => {
        Cliente.belongsToMany(models.Grupo, {
          through: 'Grupo_Cliente', foreignKey: 'idgrupo', as: 'grupo'
        });
      }
    },
    scopes: {
      cliente: (id) => {
        return {
          where: {
            id: id
          }
        };
      }
    }
  });
  Cliente.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.get('password'));
  };
  return Cliente;
};

function hashPassword (password) {
  if (!password) {
    return false;
  }
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
