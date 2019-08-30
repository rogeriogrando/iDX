module.exports = { up, down };

async function up (db) {
  await db.sequelize.query(' CREATE VIEW vw_cardapio AS \n' +
' SELECT e.idempresa,c.idcardapio,cp.idcardapio_prato, cpd.idcardapio_prato_porcao, i.iditem_porcao, cp.idprato, nomefantasia, cidade, uf, bairro, rua, complemento, referencia, dia, descricao_prato, item, vl_porcao * cpd.qt_porcao as vl_porcao \n' +
' FROM empresa e \n' +
' JOIN cardapio c ON c.idempresa = e.idempresa \n' +
' JOIN cardapio_prato cp ON cp.idcardapio = c.idcardapio \n' +
' JOIN cardapio_prato_porcao cpd ON cpd.idcardapio_prato = cp.idcardapio_prato \n' +
' JOIN item_porcao i ON i.iditem_porcao = cpd.iditem_porcao');
}

async function down (db) {
  await db.sequelize.query('DROP VIEW vw_cardapio;');
}
