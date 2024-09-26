DROP VIEW usuario.cliente_card;
-- Join Para ejecucion -- 
CREATE VIEW usuario.cliente_card AS
SELECT COALESCE(c.no_card,'S/T') AS no_card ,c.nit ,c.nombre ,
CASE
  WHEN t.tipo = 'C' THEN 'COMUN'
  WHEN t.tipo = 'O' THEN 'ORO'
  WHEN t.tipo = 'P' THEN 'PLATINO'
  WHEN t.tipo = 'D' THEN 'DIAMANTE'
  ELSE 'N/A'
END AS type_card ,
COALESCE(t.puntos,0) AS puntos,COALESCE(t.acumulado,0) AS acumulado,
CASE 
    WHEN t.tipo IS NULL THEN 'S/T' 
    WHEN (t.tipo = 'C') AND (t.acumulado>=10000.00) THEN 'SOLICITAR ORO'
    WHEN (t.tipo = 'O') AND (t.acumulado>=20000.00) THEN 'SOLICITAR PLATINO'
    WHEN (t.tipo = 'P') AND (t.acumulado>=30000.00) THEN 'SOLICITAR DIAMANTE'
    WHEN (t.tipo = 'D') THEN 'MAXIMO'
    ELSE 'FALTA'
END AS subir
FROM usuario.cliente c  
LEFT JOIN usuario.tarjeta t ON c.no_card = t.no_card;

-- Join Para ejecucion -- 
SELECT c.no_card ,c.nombre,
CASE
  WHEN t.tipo = 'C' THEN 'COMUN'
  WHEN t.tipo = 'O' THEN 'ORO'
  WHEN t.tipo = 'P' THEN 'PLATINO'
  WHEN t.tipo = 'D' THEN 'DIAMANTE'
  ELSE 'N/A'
END AS type_card
, t.puntos
FROM usuario.cliente c  
INNER JOIN usuario.tarjeta t ON c.no_card = t.no_card;

-- triggers para cambio de tarjeta
CREATE OR REPLACE FUNCTION update_tarjeta(no_card VARCHAR)
RETURNS void AS $$
BEGIN
    UPDATE usuario.tarjeta
    SET acumulado = 
    VALUES (OLD.id, OLD.salario, NEW.salario);
    RETURN NEW;  -- Retorna la fila modificada para permitir el `UPDATE`
END;
$$ LANGUAGE plpgsql;

/*
    SELECT EN FUNCIONAMIENTO 
*/

SELECT * FROM usuario.cliente_card;
-- values n_card and nit --  
SELECT usuario.insert_card('1238','5264137895');
-- values n_card and nit --
SELECT usuario.insert_card('1241','5264137896');
-- values n_card and cantidad_puntos a cajear --
SELECT usuario.update_puntos_canjeado('1234',5);
-- values n_card and total_acumular -- 
SELECT usuario.update_acumular_card('1240',12000.7900);
-- update data of the card --
CALL usuario.update_tipo_card('1240');