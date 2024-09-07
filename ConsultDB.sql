-- Join Para ejecucion -- 
SELECT c.no_card ,c.nombre,
CASE
  WHEN t.tipo = 'C' THEN 'COMUN'
  WHEN t.tipo = 'O' THEN 'ORO'
  WHEN t.tipo = 'P' THEN 'PLATINO'
  WHEN t.tipo = 'D' THEN 'DIAMANTE'
  ELSE 'N/A'
END AS type_card ,
t.puntos,t.acumulado,
CASE 
    WHEN t.tipo IS NULL THEN 'SIN TARJETA' 
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
CREATE OR REPLACE FUNCTION update_tarjeta()
RETURNS TRIGGER AS $$
BEGIN
    -- Insertar un registro en la tabla de auditoría
    INSERT INTO empleados_auditoria (empleado_id, salario_antiguo, salario_nuevo)
    VALUES (OLD.id, OLD.salario, NEW.salario);
    RETURN NEW;  -- Retorna la fila modificada para permitir el `UPDATE`
END;
$$ LANGUAGE plpgsql;

