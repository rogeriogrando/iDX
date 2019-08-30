const Grupo = require('../../src/models/grupo.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const Grupo = db.sequelize.define('Grupo', {
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
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'grupo'
  });
  await Grupo.sync();
}

async function down (db) {
  await Grupo(db.sequelize, db.Sequelize).drop();
}
