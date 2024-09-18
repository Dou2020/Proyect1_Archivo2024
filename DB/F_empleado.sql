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


SELECT personal.exist_personal('caj1','12345');

SELECT personal.type_personal('caj1','1234');