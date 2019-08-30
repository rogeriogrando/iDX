module.exports = { up, down };

async function up (db) {
  await db.sequelize.query('CREATE OR REPLACE FUNCTION ft_atualiza_grupo() \n' +
'  RETURNS trigger AS \n' +
'$BODY$ \n' +
'DECLARE \n' +
'  nExist integer; \n' +
'  idGrupoNovo integer; \n' +
'BEGIN \n' +
'  INSERT INTO grupo ( grupo, created_at, update_at)  \n' +
'             VALUES ( NEW.nome, now(), now()) \n' +
'  RETURNING idgrupo INTO idGrupoNovo; \n' +
'  INSERT INTO grupo_cliente  (idgrupo, idcliente, habilitado, created_at, update_at) VALUES ( idGrupoNovo, NEW.id, true,  now(), now()); \n' +
'  RETURN NEW; \n' +
'END; \n' +
'$BODY$ \n' +
'  LANGUAGE plpgsql VOLATILE; ');
}

async function down (db) {
  await db.sequelize.query('DROP FUNCTION public.ft_atualiza_grupo();');
}
