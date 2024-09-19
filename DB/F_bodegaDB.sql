-- VALUES COD, NAME, PRECIO, CANTIDAD, SUBCURSAL  --
CREATE OR REPLACE FUNCTION almacen.insert_producto(cod VARCHAR, nombre VARCHAR, pre DECIMAL, can INT,sub VARCHAR)
RETURNS void AS $$
DECLARE
    n_pro VARCHAR;
    c_sub INT;
BEGIN 
    SELECT name INTO n_pro FROM almacen.producto
    WHERE cod_producto = cod;
    -- valida si existe el producto
    IF n_pro IS NULL THEN
        INSERT INTO almacen.producto(cod_producto,name) VALUES
        (cod,nombre);
    END IF;
    -- si el nombre no coincide con el con el codigo
    IF n_pro != nombre THEN
        RAISE EXCEPTION 'Nombre no coincide con el codigo';
    END IF;

    SELECT cantidad INTO c_sub FROM almacen.bodega
    WHERE cod_producto = cod AND subcursal = sub;

    IF c_sub IS NULL THEN
        INSERT INTO almacen.bodega(subcursal, cod_producto, precio, cantidad) VALUES
        (sub, cod, pre,can);
    ELSIF pre IS NULL THEN
        UPDATE almacen.bodega 
        SET cantidad = c_sub + can
        WHERE subcursal = sub AND cod_producto = cod;

    ELSE
        UPDATE almacen.bodega 
        SET cantidad = c_sub + can, precio = pre
        WHERE subcursal = sub AND cod_producto = cod;
    END IF;
END;
$$ LANGUAGE plpgsql

DROP VIEW almacen.product_bodega;
CREATE VIEW almacen.product_bodega AS
SELECT COALESCE(a.subcursal,'N/A') AS subcursal, b.cod_producto, b.name, COALESCE(a.cantidad, 0) AS cantidad, COALESCE(a.precio,0.0) AS precio
FROM almacen.bodega a 
RIGHT JOIN almacen.producto b 
ON a.cod_producto = b.cod_producto;

SELECT * FROM almacen.product_bodega WHERE subcursal='N/A';

CREATE OR REPLACE FUNCTION almacen.insert_producto(sub VARCHAR)
RETURNS void AS $$
DECLARE

BEGIN
    RETURN CREATE VIEW almacen.product_bodega AS
            SELECT * FROM almacen.bodega a 
            INNER JOIN almacen.producto b 
            ON a.cod_producto = b.cod_producto
            WHERE a.subcursal=sub;

END;
$$ LANGUAGE plpgsql