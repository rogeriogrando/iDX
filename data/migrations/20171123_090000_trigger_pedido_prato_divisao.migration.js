module.exports = { up, down };

async function up (db) {
  await db.sequelize.query('CREATE OR REPLACE FUNCTION public.ft_valida_item_pedido() \n' +
'  RETURNS trigger AS \n' +
'$BODY$  \n' +
'DECLARE  \n' +
'  somaPorcao integer; \n' +
'  qtPorcaoPrato integer; \n' +
'BEGIN  \n' +
'  SELECT sum(qt_porcao_item), pp.qt_porcao INTO somaPorcao, qtPorcaoPrato \n' +
'  FROM pedido_prato_porcao ppp   \n' +
'  JOIN pedido_prato pp ON pp.idpedidoprato = ppp.idpedidoprato   \n' +
'  WHERE pp.idpedidoprato  = NEW.idpedidoprato GROUP BY qt_porcao; \n' +
'  somaPorcao = somaPorcao + NEW.qt_porcao_item; \n' +
'  IF somaPorcao > qtPorcaoPrato THEN \n' +
'    RAISE EXCEPTION ' + "'" + 'Opção selecionada não comporta a quantidade solicitada.' + "'" + '; \n' +
'  END IF; \n' +
'  RETURN NEW;  \n' +
'END;  \n' +
'$BODY$ \n' +
'  LANGUAGE plpgsql VOLATILE; ');
}

async function down (db) {
  await db.sequelize.query('DROP FUNCTION public.ft_valida_item_pedido();');
}
