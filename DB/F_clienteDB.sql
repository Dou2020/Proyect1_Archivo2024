-- INSERT TAJETA A CLIENTE
CREATE OR REPLACE FUNCTION usuario.insert_card(card VARCHAR, cl VARCHAR)
RETURNS void AS $$
DECLARE
  s_card VARCHAR;
  n_cliente VARCHAR;
BEGIN
  SELECT no_card INTO s_card 
  FROM usuario.tarjeta
  WHERE no_card = card;

  SELECT no_card INTO n_cliente
  FROM usuario.cliente
  WHERE nit = cl;

  IF s_card IS NOT NULL THEN
    RAISE EXCEPTION 'tarjeta existente';
  END IF;
  IF n_cliente IS NOT NULL THEN
    RAISE EXCEPTION 'cliente con tarjeta';
  END IF;

  INSERT INTO usuario.tarjeta(no_card,tipo,puntos,acumulado)
  VALUES(card,'C',0,0);
  
  UPDATE usuario.cliente 
  SET no_card = card 
  WHERE nit = cl;
END;
$$ LANGUAGE plpgsql


-- Actualizar el tipo de tarjeta usuario si se puede
CREATE OR REPLACE PROCEDURE usuario.update_tipo_card(card VARCHAR)
LANGUAGE plpgsql
AS $$
DECLARE
  t_card VARCHAR;
BEGIN
    SELECT
    CASE
      WHEN tipo = 'C' THEN 'O' -- CAMBIAR DE COMUN A ORO --
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

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR, REVERTIR TODOS LOS CAMBIOS';
        ROLLBACK;
END; 
$$;

-- UPDATE ACUMULAR, PUNTOS EN TAJETA --
CREATE OR REPLACE FUNCTION usuario.update_acumular_card(card VARCHAR,cantidad DECIMAL)
RETURNS void AS $$
DECLARE
    t_card VARCHAR;
    t_puntos DECIMAL;
    c_puntos INT;
    total_puntos DECIMAL;
    t_acumulado DECIMAL;
    c_acumulado DECIMAL;
BEGIN
    SELECT tipo,acumulado,puntos INTO t_card,t_acumulado,total_puntos
    FROM usuario.tarjeta
    WHERE no_card = card;

c_puntos = (cantidad/200);
CASE t_card
    WHEN 'C' THEN t_puntos = c_puntos*5+total_puntos;
    WHEN 'O' THEN t_puntos = c_puntos*10+total_puntos;
    WHEN 'P' THEN t_puntos = c_puntos*20+total_puntos;
    WHEN 'D' THEN t_puntos = c_puntos*30+total_puntos;
    ELSE
        RAISE EXCEPTION 'NO EXISTE LA TARJETA';
END CASE;
c_acumulado = t_acumulado + cantidad; 
UPDATE usuario.tarjeta
SET acumulado = c_acumulado, puntos = t_puntos
WHERE no_card = card;
END;
$$ LANGUAGE plpgsql;

-- UPDATE CANTIDAD DE PUNTOS TARJETA --
CREATE OR REPLACE FUNCTION usuario.update_puntos_canjeado(card VARCHAR, cantidad DECIMAL)
RETURNS void AS $$
DECLARE
p_card DECIMAL;
final DECIMAL;
BEGIN
    SELECT puntos INTO p_card 
    FROM usuario.tarjeta
    WHERE no_card = card;

    IF p_card IS NULL THEN
        RAISE EXCEPTION 'No existe tarjeta';
    ELSIF p_card < cantidad THEN
        RAISE EXCEPTION 'cantidad de puntos insuficientes';
    ELSE
        final = p_card-cantidad;
    END IF;
    UPDATE usuario.tarjeta SET puntos = final
    WHERE no_card = card;
    RAISE NOTICE 'descuento de puntos % disponibles %',cantidad,final;
END;
$$ LANGUAGE plpgsql;

SELECT usuario.update_tipo_card2("1234");

DROP FUNCTION usuario.update_tipo_card;
-- UPDATE TIPO DE TARJETA -- 
CREATE OR REPLACE FUNCTION usuario.update_tipo_card2(card VARCHAR)
RETURNS void AS $$
DECLARE
  t_card VARCHAR;
BEGIN
    SELECT
    CASE
      WHEN tipo = 'C' THEN 'O' -- CAMBIAR DE COMUN A ORO --
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

/*  En este trigger before cuando cambie el tipo de tarjeta 
*   se tiene que resetiar la cantidad acumulada
*   CREAR FUNCION PARA EL TRIGGER
*/

DROP FUNCTION usuario.ajustar_acumulado();
CREATE OR REPLACE FUNCTION usuario.ajustar_acumulado()
RETURNS TRIGGER AS $$
BEGIN
    -- Si la cantidad es mayor a 100, aplicar un descuento
    IF NEW.tipo = OLD.tipo THEN
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

DROP TRIGGER ajustar_acumulado_cliente ON usuario.tarjeta;

-- CREAR EL TRIGGER PARA usuario.tarjeta
CREATE TRIGGER ajustar_acumulado_cliente
BEFORE UPDATE ON usuario.tarjeta
FOR EACH ROW
WHEN (OLD.tipo IS DISTINCT FROM NEW.tipo)
EXECUTE FUNCTION usuario.ajustar_acumulado();

