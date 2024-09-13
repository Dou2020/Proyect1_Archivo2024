-- codigo, cantidad, subcursal, pasillo
SELECT almacen.insert_estante('C1',5,'CENTRO2','CAS2');
-- codigo, cantidad, subcursal, pasillo no modificar
SELECT almacen.insert_estante('C1',5,'CENTRO2',NULL);

SELECT * FROM almacen.estante;

SELECT * FROM almacen.estante a 
INNER JOIN almacen.bodega b 
ON a.cod_producto = b.cod_producto AND a.subcursal=b.subcursal;

    SELECT cantidad FROM almacen.estante
    WHERE cod_producto = 'C1';
