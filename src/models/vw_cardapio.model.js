// import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataType) => {
  const VwCardapio = sequelize.define('VwCardapio', {
    idempresa: {
      type: DataType.INTEGER,
      field: 'idempresa'
    },
    idcardapio: {
      type: DataType.INTEGER,
      field: 'idcardapio'
    },
    idcardapio_prato: {
      type: DataType.INTEGER,
      field: 'idcardapio_prato'
    },
    idcardapio_prato_porcao: {
      type: DataType.INTEGER,
      field: 'idcardapio_prato_porcao'
    },
    iditem_porcao: {
      type: DataType.INTEGER,
      field: 'iditem_porcao'
    },
    idprato: {
      type: DataType.INTEGER,
      field: 'idprato'
    },
    idpratoporcao: {
      type: DataType.INTEGER,
      field: 'idpratoporcao'
    },
    nomefantasia: {
      type: DataType.STRING(60),
      field: 'nomefantasia'
    },
    cidade: {
      type: DataType.STRING(60),
      field: 'cidade'
    },
    uf: {
      type: DataType.STRING(2),
      field: 'uf'
    },
    bairro: {
      type: DataType.STRING(60),
      field: 'bairro'
    },
    rua: {
      type: DataType.STRING(60),
      field: 'rua'
    },
    complemento: {
      type: DataType.STRING(60),
      field: 'complemento'
    },
    referencia: {
      type: DataType.STRING(100),
      field: 'referencia'
    },
    dia: {
      type: DataType.STRING(20),
      field: 'dia'
    },
    descricao_prato: {
      type: DataType.STRING(255),
      field: 'descricao_prato'
    },
    item: {
      type: DataType.STRING(50),
      field: 'item'
    },
    vl_porcao: {
      type: DataType.DECIMAL(20, 2),
      field: 'vl_porcao'
    }
  }, {
    tableName: 'vw_cardapio'
  });
  return VwCardapio;
};
