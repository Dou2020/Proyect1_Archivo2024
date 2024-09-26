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

--------------Ingresar Descuento de puntos-----------------
DROP PROCEDURE contador.insert_productfactura;
CREATE OR REPLACE PROCEDURE contador.insert_descuFactura(
    no_card VARCHAR, 
    des DECIMAL, 
     fac VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN

    -- AGREGA EL DESCUENTO A LA FACTURA
    UPDATE contador.factura
    SET total_descuento = des
    WHERE no_factura = fac;
    -- ACTUALIZA LA CANTIDAD DE PUNTOS CANJEADO
    SELECT usuario.update_puntos_canjeado(no_card, des);

    RAISE NOTICE 'UPDATE FACTURA DESCUENTO %  FACTURA NO. %', des, fac;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR, UPDATE FACTURA DESCUENTO %  FACTURA NO. %', des, fac;
        ROLLBACK;
END; 
$$;

CALL contador.insert_descuFactura('1234',5,'004')

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
------TRIGGER PARA UPDATE contador.producto_vendido -------
----// sumar la cantidad ya existente // -------------
----// usuario tiene tarjeta acumular puntos //-------
DROP FUNCTION contador.venta_acumular();
 CREATE OR REPLACE FUNCTION contador.venta_acumular()
RETURNS TRIGGER AS $$
DECLARE
    card VARCHAR;
    p DECIMAL;
    total DECIMAL;
BEGIN  
    -- EXTRAER EL no_card --
    SELECT b.no_card INTO card FROM contador.factura a
    JOIN usuario.cliente b ON a.nit = b.nit
    WHERE a.no_factura = OLD.no_factura
    LIMIT 1;
    -- precio del producto --
    SELECT precio INTO p
    FROM contador.detalle_factura 
    WHERE no_factura =OLD.no_factura AND cod_producto = OLD.cod_producto;

    -- ACUMULA PUNTOS EN TARJETA Y ACUMULA COMPRA --
    total = p * NEW.cantidad;
    -- utilizar PERFORM CUANDO SE UTILIZA UNA FUNCION 
    PERFORM usuario.update_acumular_card(card, total);

    NEW.cantidad = OLD.cantidad + NEW.cantidad;

    RAISE NOTICE 'UPDATE, CANTIDAD OF contador.producto_vendido % ACUMULAR % CARD %', NEW.cantidad,total,card;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-------CREAR EL TRIGGER A contador.venta_acumular()--------
DROP TRIGGER ajustar_update_venta_producto_factura ON contador.producto_vendido;
CREATE TRIGGER ajustar_update_venta_producto_factura
BEFORE UPDATE ON contador.producto_vendido
FOR EACH ROW
WHEN (OLD.cantidad IS DISTINCT FROM NEW.cantidad)
EXECUTE FUNCTION contador.venta_acumular();

-------TRIGGER PARA ACTUALIZAR PUNTOS AL COMPRAR------------
CREATE OR REPLACE FUNCTION contador.ajustar_acumulado()
RETURNS TRIGGER AS $$
BEGIN  
    


    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-------CREAR EL TRIGGER--------
CREATE TRIGGER ajustar_acumulado_cliente
BEFORE UPDATE ON contador.factura
FOR EACH ROW
WHEN (OLD.total_descuento IS DISTINCT FROM NEW.total_descuento)
EXECUTE FUNCTION contador();



--------- PRUEBA DE INSERT FACTURA EN UN PODRUCE--------------
CALL contador.insert_facturaInit('111','caj1','5264137891');

--------- PRUEBA DE INSERT DE PRODUCTO EN UN PRODUCE---------------
CALL contador.insert_productFactura('001','C1',1);


------------VISTA DE DETALLE COMPRA -----------------
DROP VIEW contador.detalle_factura;
CREATE VIEW contador.detalle_factura AS 
SELECT a.no_factura, a.nit, a.total_descuento, b.subcursal, c.cod_producto, e.name, d.cantidad , c.precio, (c.precio * d.cantidad) AS total
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
WHERE no_factura ='001'; --search of no_factura--

----------------Total a cancelar de factura EN VIEW-------------------------
SELECT SUM(total) AS total_pagar
FROM contador.detalle_factura 
WHERE no_factura = '004'; --search of no_factura--

---Top de Facturas mas grandes----
SELECT no_factura, subcursal, SUM(total) AS total_factura
FROM contador.detalle_factura 
GROUP BY no_factura, subcursal
ORDER BY total_factura DESC;

-- TOP DE 10 PRODUCTOS MAS VENDIDOS---
SELECT cod_producto, name, SUM(cantidad) AS total_producto 
FROM contador.detalle_factura
GROUP BY cod_producto,name
ORDER BY total_producto DESC
LIMIT 10;

---TOP DE ventas por subcursal---
SELECT subcursal, SUM(total) AS total_venta
FROM contador.detalle_factura
GROUP BY subcursal
ORDER BY total_venta DESC;

--TOP 10 DE CLIENTES MAS HAN GASTADO--
SELECT nit, SUM(total) AS total_compra
FROM contador.detalle_factura
GROUP BY nit
ORDER BY total_compra DESC
LIMIT 10;


------------ CALCULAR EL TOTAL DE PODUCTO EN ESTANTE Y BODEGA ---------------
DROP VIEW almacen.total_product;
CREATE VIEW almacen.total_product AS 
SELECT a.subcursal, a.cod_producto, (a.cantidad + COALESCE(b.cantidad,0)) AS total_producto
FROM almacen.bodega a
LEFT JOIN almacen.estante b
ON a.cod_producto = b.cod_producto 
AND a.subcursal = b.subcursal;

-------------TOTAL DE PRODUCT -------------------
SELECT * FROM almacen.total_product;






















------ error no imprementado ------
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