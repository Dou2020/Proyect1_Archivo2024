-- Join Para ejecucion -- 
SELECT c.no_card ,c.nombre,
CASE
  WHEN t.tipo = 'C' THEN 'COMUN'
  WHEN t.tipo = 'O' THEN 'ORO'
  WHEN t.tipo = 'P' THEN 'PLATINO'
  WHEN t.tipo = 'D' THEN 'DIAMANTE'
  ELSE 'N/A'
END AS type_card,
t.puntos,
CASE 
    WHEN t.acumulado 
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

-- 
