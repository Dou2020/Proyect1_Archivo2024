-- VALUES COD, NAME, PRECIO, CANTIDAD, SUBCURSAL  --
SELECT almacen.insert_producto('C1','wiwis',450.8,5,'CENTRO2');
-- INSERT proyect valores -- 
SELECT almacen.insert_producto('C1',NULL,NULL,5,'CENTRO1');
SELECT almacen.insert_producto('C1',NULL,45.4,50,'CENTRO1');

SELECT a.cod_producto, a.name, b.precio, b.cantidad, b.subcursal 
FROM almacen.producto a
JOIN almacen.bodega b
ON a.cod_producto = b.cod_producto ;
SELECT * FROM almacen.producto WHERE cod_producto='C1';