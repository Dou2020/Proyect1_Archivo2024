
CREATE OR REPLACE FUNCTION personal.exist_personal(usu VARCHAR, pass VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN

    RETURN EXISTS (SELECT 1 FROM personal.empleado WHERE usuario = usu AND "password" = pass);

END;
$$ LANGUAGE plpgsql

CREATE OR REPLACE FUNCTION personal.type_personal(usu VARCHAR, pass VARCHAR)
RETURNS text AS $$
DECLARE
t_personal VARCHAR;
BEGIN
    SELECT rol INTO t_personal 
    FROM personal.empleado 
    WHERE usuario = usu AND "password" = pass;
    
    RETURN t_personal;

END;
$$ LANGUAGE plpgsql

DROP FUNCTION personal.value_personal;

CREATE OR REPLACE FUNCTION personal.value_personal(usu VARCHAR, pass VARCHAR)
RETURNS TABLE(usuario VARCHAR, rol VARCHAR, subcursal VARCHAR, estado VARCHAR) AS $$

BEGIN
    RETURN QUERY SELECT empleado.usuario, empleado.rol, empleado.subcursal, empleado.estado FROM personal.empleado WHERE empleado.usuario=usu AND empleado.password = pass;
END;
$$ LANGUAGE plpgsql

DROP PROCEDURE personal.update_employee;
CREATE OR REPLACE PROCEDURE personal.update_employee(usu VARCHAR, nombre VARCHAR, pass VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE personal.empleado 
    SET name = nombre, password= pass
    WHERE usuario = usu;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR, REVERTIR TODOS LOS CAMBIOS';
        ROLLBACK;
END; 
$$;
CALL personal.insert_employee('bodeg5','Eduar','bod','CENTRO1','1234');

CREATE OR REPLACE PROCEDURE personal.insert_employee(usu VARCHAR,nombre VARCHAR, r VARCHAR, sub VARCHAR, pass VARCHAR )
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO personal.empleado(usuario,password,name,rol,subcursal,estado)
    VALUES(usu, pass, nombre ,r ,sub, '1');

    RAISE NOTICE 'Empleado % insertado correctamente.', usu;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR, REGISTRAR EMPLEADO PRODUCE personal.update_status_employee';
        ROLLBACK;
END; 
$$;

DROP VIEW personal.view_employees;

-- Crear una vista de empleados --
CREATE VIEW personal.view_employees AS 
SELECT usuario,name,rol,subcursal,estado 
FROM personal.empleado 
WHERE rol != 'adm'
ORDER BY subcursal;

SELECT * FROM personal.view_employees

-- Pruebas de las funciones --
SELECT personal.exist_personal('caj1','12345');
SELECT personal.type_personal('caj1','1234');
SELECT * FROM personal.value_personal('caj1','1234');

--modificando en usuario nombre y password--
CALL personal.update_employee('bodeg2','Dou','1234');
