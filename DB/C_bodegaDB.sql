-- VALUES COD, NAME, PRECIO, CANTIDAD, SUBCURSAL  --
SELECT almacen.insert_producto('C1','wiwi',450.8,5,'CENTRO2');
-- INSERT proyect valores -- 
SELECT almacen.insert_producto('C1',NULL,NULL,5,'CENTRO1');
SELECT almacen.insert_producto('P5',NULL,45.4,50,'CENTRO1');

SELECT a.cod_producto, a.name, b.precio, b.cantidad, b.subcursal 
FROM almacen.producto a
JOIN almacen.bodega b
ON a.cod_producto = b.cod_producto;

SELECT * FROM almacen.producto;


        SELECT a.cod_producto, (a.cantidad + b.cantidad ) AS existencia FROM almacen.bodega a
        INNER JOIN almacen.estante b
        ON a.cod_producto = b.cod_producto AND a.subcursal = b.subcursal;