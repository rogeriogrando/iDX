const GrupoCliente = require('../../src/models/grupo_cliente.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const GrupoCliente = db.sequelize.define('GrupoCliente', {
    idcliente: {
      type: DataType.INTEGER,
      allowNull: false,
      field: 'idcliente',
      autoIncrement: false,
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
      autoIncrement: false,
      references: {
        model: 'grupo',
        key: 'idgrupo'
      },
      unique: 'uq_grupo_cliente'
    },
    habilitado: {
      type: DataType.BOOLEAN,
      allowNull: false,
      unique: false,
      defaultValue: true
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'grupo_cliente'
  });
  await GrupoCliente.sync();
}
async function down (db) {
  await GrupoCliente(db.sequelize, db.Sequelize).drop();
}
