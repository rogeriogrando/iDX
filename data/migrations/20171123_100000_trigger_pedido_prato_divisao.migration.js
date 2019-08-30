module.exports = { up, down };

async function up (db) {
  await db.sequelize.query('CREATE TRIGGER tr_valida_item_pedido \n' +
'  BEFORE INSERT OR UPDATE \n' +
'  ON public.pedido_prato_porcao \n' +
'  FOR EACH ROW \n' +
'  EXECUTE PROCEDURE public.ft_valida_item_pedido(); ');
}

async function down (db) {
  await db.sequelize.query('DROP TRIGGER tr_valida_item_pedido ON public.pedido_prato_porcao;');
}
