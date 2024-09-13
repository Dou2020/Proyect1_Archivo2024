-- Active: 1725939132344@@127.0.0.1@5432@web_shop
-- Crear la base de datos --
CREATE DATABASE web_shop;

-- ingresar a la base de datos en postgres
\c web_shop;
-- Creando Shemas
CREATE SCHEMA shop;
CREATE SCHEMA almacen;
CREATE SCHEMA personal;
CREATE SCHEMA usuario;
CREATE SCHEMA contador;

-- entidad subcursal --
CREATE TABLE shop.subCursal(
  nombre VARCHAR(20) NOT NULL PRIMARY KEY
);

-- Realizar Insert de Subcursales predeterminadas 
INSERT INTO shop.subCursal(nombre) 
VALUES ('PARQUE'), ('CENTRO1'), ('CENTRO2'), ('GENERAL');

-- empleado Cajero, Bodega, Inventario, Administrador -- 
CREATE TABLE personal.empleado (
  usuario VARCHAR(9) NOT NULL PRIMARY KEY,
  password VARCHAR(10) NOT NULL,
  name VARCHAR(50) NOT NULL,
  rol VARCHAR(3) NOT NULL,
  subCursal VARCHAR(20) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  FOREIGN KEY (subCursal) REFERENCES shop.subCursal(nombre)
);

INSERT INTO personal.empleado(usuario, password, name, rol, subCursal, estado) VALUES 
    -- Insert de 2 user cajero en cada subcursal -- 
    ('caj1', '1234', 'Edgar Gonzales', 'caj','PARQUE','1'),
    ('caj2', '1234', 'Brandon Gonzales', 'caj','CENTRO1','1'), 
    ('caj3', '1234', 'Emily Gonzales', 'caj','CENTRO2','1'),
    ('caj4', '1234', 'John Doe', 'caj', 'PARQUE', '1'),
    ('caj5', '1234', 'Jane Smith', 'caj', 'CENTRO1', '1'),
    ('caj6', '1234', 'Bob Johnson', 'caj', 'CENTRO2', '1'),
    -- Insert de user Bodega en cada Subcursal -- 
    ('bodeg1', '1234', 'Johns Doe', 'bod', 'PARQUE', '1'),
    ('bodeg2', '1234', 'Janes Smith', 'bod', 'CENTRO1', '1'),
    ('bodeg3', '1234', 'Bobs Johnson', 'bod', 'CENTRO2', '1'),
    -- Insert de user Inven en cada Subcursal -- 
    ('inven1', '1234', 'Edgars Gonzales', 'inv','PARQUE','1'),
    ('inven2', '1234', 'Brandons Gonzales', 'inv','CENTRO1','1'), 
    ('inven3', '1234', 'Emilys Gonzales', 'inv','CENTRO2','1'),
    -- Insert de user administrador de todas las subcursales -- 
    ('admin','1234','Douglas Gomez','adm','GENERAL','1');

-- Tarjetas de puntos de los clientes -- 
CREATE TABLE usuario.tarjeta(
    no_card VARCHAR(10) NOT NULL PRIMARY KEY,
    tipo VARCHAR(5) NOT NULL,
    puntos DECIMAL(12,4) NOT NULL,
    acumulado DECIMAL(12,4) NOT NULL
);

-- INSERT tarjeta 
INSERT INTO usuario.tarjeta(no_card,tipo,puntos,acumulado) VALUES
('1234','C',500.00,10000.00),
('1235','O',500.00,20000.00),
('1236','P',500.00,30000.00),
('1237','D',500.00,600.00);

-- crear tabla cliente con id el NIT --
CREATE TABLE usuario.cliente(
    nit VARCHAR(10) NOT NULL PRIMARY KEY,
    nombre VARCHAR(25) NOT NULL,
    no_card VARCHAR(10),
    FOREIGN KEY (no_card) REFERENCES usuario.tarjeta(no_card)
);

-- Insert of 4 Cliente with no_card -- 
INSERT INTO usuario.cliente(nit,nombre,no_card) VALUES 
('5264137891','Jhonn Doe','1234'),
('5264137892','Janee Smith','1235'),
('5264137893','Bobb Johson','1236'),
('5264137894', 'Juan Martinez','1237');

-- Insert of 4 Cliente N/A --
INSERT INTO usuario.cliente(nit,nombre) VALUES
('5264137895','Devora Lux'),
('5264137896','Ana de la Rosa'),
('5264137897','Fancisco Lopez'),
('5264137898','Laura Gil');

-- Asigna una caja a un empleado.cajero -- 
CREATE TABLE personal.caja (
    no_caja VARCHAR(5) NOT NULL,
    sub_caja  VARCHAR(20) NOT NULL,
    user_empleado VARCHAR(9),
    FOREIGN KEY (sub_caja) REFERENCES shop.subcursal(nombre),
    FOREIGN KEY (user_empleado) REFERENCES personal.empleado(usuario)
);
INSERT INTO personal.caja(no_caja,sub_caja,user_empleado) VALUES
    -- INSERT de caja a empleado en cada subcursal --
    ('C-1','PARQUE','caj1'),
    ('C-1','CENTRO1','caj2'),
    ('C-1','CENTRO2','caj3');
INSERT INTO personal.caja(no_caja,sub_caja) VALUES
    -- INSERT de caja en cada subcursal --
    ('C-2','PARQUE'),
    ('C-3','PARQUE'),
    ('C-2','CENTRO1'),
    ('C-3','CENTRO1'),
    ('C-2','CENTRO2'),
    ('C-3','CENTRO2');

DROP TABLE almacen.producto;
-- ingreso de porducto --
CREATE TABLE almacen.producto(
  cod_producto VARCHAR(8) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

DROP TABLE almacen.bodega;
-- producto en bodega --
CREATE TABLE almacen.bodega(
  subCursal VARCHAR(20) NOT NULL,
  cod_producto VARCHAR(10) NOT NULL,
  precio DECIMAL(12,4) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (cod_producto) REFERENCES almacen.producto(cod_producto),
  FOREIGN KEY (subCursal) REFERENCES shop.subCursal(nombre)
);

SELECT * FROM almacen.producto FULL JOIN almacen.bodega ON almacen.producto.cod_producto = almacen.bodega.cod_producto WHERE almacen.bodega.cod_producto = 'prod200' AND almacen.bodega.subcursal = 'CENTRAL'; 
-- regitro de producto a la bodega SUBCURSAL SUR,CENTRAL,NORTE -- p
-- registro de estante --
CREATE TABLE almacen.estante(
  subCursal VARCHAR(20) NOT NULL,
  cod_producto VARCHAR(10) NOT NULL,
  no_pasillo VARCHAR(5) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (cod_producto) REFERENCES almacen.producto(cod_producto),
  FOREIGN KEY (subcursal) REFERENCES shop.subCursal(nombre)
);

-- factura --
CREATE TABLE contador.factura(
  no_factura VARCHAR(10) NOT NULL PRIMARY KEY,
  user_empleado VARCHAR(9) NOT NULL,
  nit VARCHAR(10) NOT NULL,
  total DECIMAL(12,4) NOT NULL,
  total_descuento DECIMAL(12,4) NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (user_empleado) REFERENCES personal.caja(user_empleado),
  FOREIGN KEY (nit) REFERENCES usuario.cliente(nit)
);

-- Producto vendido --
CREATE TABLE contador.producto_vendido(
  no_factura VARCHAR(10) NOT NULL,
  cod_producto VARCHAR(10) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (cod_producto) REFERENCES almacen.producto(cod_producto),
  FOREIGN KEY (no_factura) REFERENCES contador.factura(no_factura)
);

DROP SCHEMA public;