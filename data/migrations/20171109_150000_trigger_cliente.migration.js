module.exports = { up, down };

async function up (db) {
  await db.sequelize.query('CREATE TRIGGER tr_atualiza_grupo \n' +
'  AFTER INSERT \n' +
'  ON cliente \n' +
'  FOR EACH ROW \n' +
'  EXECUTE PROCEDURE ft_atualiza_grupo(); ');
}

async function down (db) {
  await db.sequelize.query('DROP TRIGGER tr_atualiza_grupo ON public.cliente;');
}
