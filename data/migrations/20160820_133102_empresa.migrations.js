const Empresa = require('../../src/models/empresa.model');

module.exports = { up, down };

async function up (db) {
  const DataType = db.Sequelize;

  const Empresa = db.sequelize.define('Empresa', {
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
    uf: {
      type: DataType.STRING(2),
      allowNull: false,
      field: 'uf'
    },
    cidade: {
      type: DataType.STRING(60),
      allowNull: false,
      field: 'cidade'
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
    tableName: 'empresa'
  });
  await Empresa.sync();
}

async function down (db) {
  await Empresa(db.sequelize, db.Sequelize).drop();
}
