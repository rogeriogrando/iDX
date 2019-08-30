// import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataType) => {
  const GrupoCliente = sequelize.define('Grupo_Cliente', {
    idcliente: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'idcliente',
      references: {
        model: 'cliente',
        key: 'id'
      },
      unique: 'uq_grupo_cliente'
    },
    idgrupo: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'idgrupo',
      references: {
        model: 'grupo',
        key: 'idgrupo'
      },
      unique: 'uq_grupo_cliente'
    },
    habilitado: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'grupo_cliente',
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
      },
      idgrupo: (id) => {
        return {
          where: {
            ididgrupo: id
          }
        };
      }
    }
  });

  return GrupoCliente;
};
