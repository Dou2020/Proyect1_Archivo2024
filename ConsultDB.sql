-- Join Para ejecucion -- 
CREATE VIEW usuario.cliente_card AS
SELECT COALESCE(c.no_card,'S/T') AS no_card ,c.nombre,
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


/*  En este trigger before cuando cambie el tipo de tarjeta 
*   se tiene que resetiar la cantidad acumulada
*   CREAR FUNCION PARA EL TRIGGER
*/
CREATE OR REPLACE FUNCTION usuario.ajustar_acumulado()
RETURNS TRIGGER AS $$
BEGIN
    -- Si la cantidad es mayor a 100, aplicar un descuento
    IF NEW.tipo == OLD.tipo THEN
        RAISE EXCEPTION 'El tipo de tarjeta es el mismo %', NEW.tipo;
    END IF;
    CASE NEW.tipo
      WHEN 'C' THEN
          RAISE EXCEPTION 'OPCION INVALIDA PARA COMUN';
      WHEN 'O' THEN
        IF OLD.acumulado > 10000.00 THEN 
          NEW.acumulado = 0;
        ELSE 
          RAISE EXCEPTION 'cantidad acumulado insuficiente para ORO';
        END IF;
      WHEN 'P' THEN
        IF OLD.acumulado > 20000.00 THEN 
          NEW.acumulado = 0;
        ELSE 
          RAISE EXCEPTION 'cantidad acumulado insuficiente para PLATINO';
        END IF;
      WHEN 'D' THEN
        IF OLD.acumulado > 30000.00 THEN 
          NEW.acumulado = 0;
        ELSE 
          RAISE EXCEPTION 'cantidad acumulado insuficiente para DIAMANTE';
        END IF;
      ELSE 
        RAISE EXCEPTION 'TIPO INVALIDO';
    END CASE;   
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CREAR EL TRIGGER PARA usuario.tarjeta
CREATE TRIGGER ajustar_acumulado_cliente
BEFORE UPDATE ON usuario.tarjeta
FOR EACH ROW
EXECUTE FUNCTION usuario.ajustar_acumulado();



CREATE OR REPLACE FUNCTION usuario.update_tipo_tarjeta(card VARCHAR)
RETURNS void AS $$
DECLARE
  t_card VARCHAR;
BEGIN
    SELECT
    CASE
      WHEN tipo = 'C' THEN 'O'
      WHEN tipo = 'O' THEN 'P'
      WHEN tipo = 'P' THEN 'D'
      ELSE NULL
    END INTO t_card 
    FROM usuario.tarjeta 
    WHERE no_card = card;

    -- Verificar si se obtuvo un resultado --
    IF t_card IS NULL THEN
        RAISE EXCEPTION 'tarjeta no encontrado';
    END IF;
    
    UPDATE usuario.tarjeta
    SET tipo = t_card
    WHERE no_card = card;
END;
$$ LANGUAGE plpgsql;
