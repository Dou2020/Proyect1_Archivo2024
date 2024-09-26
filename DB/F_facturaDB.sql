-- VALUES NO_FACTURA, USER_EMPLEADO, NIT, FECHA, DATOS ARREGLO(cod_porducto, cantidad)
------ error no imprementado ----
CREATE OR REPLACE PROCEDURE contador.insert_factura(
    no VARCHAR, 
    u_empleado VARCHAR, 
    nit_cliente VARCHAR, 
    datos JSONB[]
)
LANGUAGE plpgsql
AS $$
DECLARE
cod_p VARCHAR;
c_producto INT;
obj JSONB;
BEGIN

    INSERT INTO contador.factura(no_factura,user_empleado,nit,total_descuento,fecha)
    VALUES(no,u_empleado,nit_cliente,0,CURRENT_DATE);
        
    FOREACH obj IN ARRAY datos
    LOOP
       cod_p := (obj->>'cod_producto')::VARCHAR;
        c_producto := (obj->>'cantidad')::INT;

        INSERT INTO contador.producto_vendido(no_factura,cod_producto,cantidad) 
        VALUES(no,cod_p,c_producto);

    END LOOP;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR, INSERT FACTURA';
        ROLLBACK;
END; 
$$;

CALL contador.insert_factura('004','caj2','5264137891',
ARRAY[
    '{ "cod_producto":"P1","cantidad":5 }'::JSONB,
    '{ "cod_producto":"P2","cantidad":5 }'::JSONB,
    '{ "cod_producto":"P3","cantidad":5 }'::JSONB,
    '{ "cod_producto":"P4","cantidad":5 }'::JSONB
    ]
);

SELECT * FROM contador.factura;

SELECT * FROM usuario.cliente_card WHERE nit = '5264137891';


--------------------Implementar factura -------------------
DROP PROCEDURE contador.insert_facturaInit;
CREATE OR REPLACE PROCEDURE contador.insert_facturaInit(
    no VARCHAR, 
    u_empleado VARCHAR, 
    nit_cliente VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN

    INSERT INTO contador.factura(no_factura,user_empleado,nit,total_descuento,fecha)
    VALUES(no,u_empleado,nit_cliente,0,CURRENT_DATE);

    RAISE NOTICE 'INSERT, FACTURA NO. % ',NO;


EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR, INSERT FACTURA NO. %', no;
        ROLLBACK;
END; 
$$;


--------------Ingresar producto a factura -----------------
DROP PROCEDURE contador.insert_productfactura;
CREATE OR REPLACE PROCEDURE contador.insert_productFactura(
    no VARCHAR, 
    cod_pro VARCHAR, 
    can_pro INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM contador.producto_vendido WHERE no_factura = no AND cod_producto = cod_pro) THEN
        
        UPDATE contador.producto_vendido
        SET cantidad = can_pro
        WHERE no_factura = no AND cod_producto = cod_pro;
        RAISE NOTICE 'UPDATE, PRODUCT COD. % A FACTURA NO. %',cod_pro,no;
    ELSE
        INSERT INTO contador.producto_vendido(no_factura,cod_producto,cantidad) 
        VALUES(no,cod_pro,can_pro);
        RAISE NOTICE 'INSERT, PRODUCT COD. % A FACTURA NO. %',cod_pro,no;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR, INSERT PRODUCT COD. % A FACTURA NO. %', cod_pro,no;
        ROLLBACK;
END; 
$$;



--------- PRUEBA DE INSERT FACTURA EN UN PODRUCE--------------
CALL contador.insert_facturaInit('111','caj1','5264137891');

--------- PRUEBA DE INSERT DE PRODUCTO EN UN PRODUCE---------------
CALL contador.insert_productFactura('001','C1',100);


------------VISTA DE DETALLE COMPRA -----------------
DROP VIEW contador.detalle_factura;
CREATE VIEW contador.detalle_factura AS 
SELECT a.no_factura, a.total_descuento, c.cod_producto, e.name, d.cantidad , c.precio, (c.precio * d.cantidad) AS total
FROM contador.factura a
RIGHT JOIN personal.empleado b
ON a.user_empleado = b.usuario
JOIN almacen.bodega c 
ON b.subcursal = c.subcursal
JOIN almacen.producto e
ON c.cod_producto = e.cod_producto
JOIN contador.producto_vendido d
ON d.cod_producto = c.cod_producto AND a.no_factura = d.no_factura;

-------------SELECCIONAR UN NO DE FACTURA Y DETALLARLO EN VIEW------------------
SELECT cod_producto, name, cantidad, precio, total
FROM contador.detalle_factura 
WHERE no_factura ='004';

----------------Total a cancelar de factura EN VIEW-------------------------
SELECT SUM(total) AS total_pagar
FROM contador.detalle_factura 
WHERE no_factura = '004';

------------ CALCULAR EL TOTAL DE PODUCTO EN ESTANTE Y BODEGA ---------------
SELECT a.subcursal, a.cod_producto, (a.cantidad + b.cantidad) AS total_producto
FROM almacen.bodega a
JOIN almacen.estante b
ON a.cod_producto = b.cod_producto AND a.subcursal = b.subcursal;
