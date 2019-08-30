module.exports = { up, down };

async function up (db) {
  await db.sequelize.query('ALTER TABLE public.pedido ADD CONSTRAINT pedido_idcliente_idgrupo_fkey FOREIGN KEY (idcliente, idgrupo) REFERENCES public.grupo_cliente (idcliente, idgrupo) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION;');
}

async function down (db) {
  await db.sequelize.query('ALTER TABLE public.pedido DROP CONSTRAINT pedido_idcliente_idgrupo_fkey;');
}
