-- VALUES NO_FACTURA, USER_EMPLEADO, NIT, FECHA, DATOS ARREGLO(cod_porducto, cantidad)
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
        RAISE NOTICE 'ERROR, REVERTIR TODOS LOS CAMBIOS';
        ROLLBACK;
END; 
$$;

CALL contador.insert_factura('001','caj2','5264137891',
ARRAY[
    '{ "cod_producto":"P1","cantidad":3 }'::JSONB,
    '{ "cod_producto":"P2","cantidad":3 }'::JSONB,
    '{ "cod_producto":"P3","cantidad":3 }'::JSONB,
    '{ "cod_producto":"P4","cantidad":3 }'::JSONB
    ]
);
SELECT * FROM contador.producto_vendido WHERE no_factura='003';

SELECT * FROM contador.factura;

-- total de la venta --
SELECT SUM(a.cantidad * b.precio) AS total FROM contador.producto_vendido a 
JOIN almacen.bodega b 
ON a.cod_producto = b.cod_producto
WHERE no_factura = '001'