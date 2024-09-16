-- codigo, cantidad, subcursal, pasillo
CREATE OR REPLACE 
FUNCTION almacen.insert_estante(cod VARCHAR, can INT, sub VARCHAR,no VARCHAR)
RETURNS void AS $$
DECLARE
    c_bodega INT;
    c_estante INT;
BEGIN
    SELECT cantidad INTO c_bodega  FROM almacen.bodega
    WHERE cod_producto = cod AND subcursal = sub;

    IF c_bodega IS NULL THEN
        RAISE EXCEPTION 'No existe producto en bodega';    
    END IF;

    SELECT cantidad INTO c_estante FROM almacen.estante
    WHERE cod_producto = cod AND subcursal = sub;

    IF c_estante IS NULL THEN
        INSERT INTO almacen.estante(subcursal, cod_producto, no_pasillo,cantidad)
        VALUES(sub,cod,no,can);
    ELSIF c_bodega < can THEN
        RAISE EXCEPTION 'cantidad insuficiente en bodega';
    ELSIF no IS NULL THEN
        UPDATE almacen.estante
        SET cantidad = c_estante + can
        WHERE cod_producto = cod AND subcursal = sub;
    ELSE
        UPDATE almacen.estante
        SET cantidad = c_estante + can, no_pasillo = no
        WHERE cod_producto = cod AND subcursal = sub;
    END IF;

    UPDATE almacen.bodega 
    SET cantidad = c_bodega - can
    WHERE cod_producto = cod AND subcursal = sub;
END;
$$ LANGUAGE plpgsql