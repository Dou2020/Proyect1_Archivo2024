
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

-- Crear una vista de empleados --
CREATE VIEW personal.view_employees AS SELECT * FROM personal.empleado WHERE rol != 'adm';

SELECT * FROM personal.view_employees

-- Pruebas de las funciones --
SELECT personal.exist_personal('caj1','12345');
SELECT personal.type_personal('caj1','1234');
SELECT * FROM personal.value_personal('caj1','1234');
