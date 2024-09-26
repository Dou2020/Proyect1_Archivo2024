// conexion de la base de datos;
const dbConnect = require('./ConectionDB/conectDB');

// exporta los modulos a app.js
module.exports = (app) => {

        // TOP Ventas mas grandes
        app.get('/api/report/topVentas', async (req, res) => {
            try {
                console.log("TOP Ventas mas grandes");
                // no requiere ningun valor
                const result = await dbConnect.connect().query('SELECT no_factura, subcursal, SUM(total) AS total_factura FROM contador.detalle_factura GROUP BY no_factura, subcursal ORDER BY total_factura DESC');
                res.json(result.rows);
            } catch (err) {
              res.status(500).send(err.message);
            }
          });

          // TOP Ventas mas grandes Subcursal
          app.get('/api/report/topSubcursal', async (req, res) => {
            try {
                console.log("TOP Ventas mas grandes Subcursal");
                // no requiere ningun valor
                const result = await dbConnect.connect().query('SELECT subcursal, SUM(total) AS total_venta FROM contador.detalle_factura GROUP BY subcursal ORDER BY total_venta DESC');
                res.json(result.rows);
            } catch (err) {
              res.status(500).send(err.message);
            }
          });

        // TOP Articulos mas vendidos
        app.get('/api/report/topArticulos', async (req, res) => {
            try {
                console.log("TOP Articulos mas vendidos");
                // no requiere ningun valor
                const result = await dbConnect.connect().query('SELECT cod_producto, name, SUM(cantidad) AS total_producto FROM contador.detalle_factura GROUP BY cod_producto,name ORDER BY total_producto DESC LIMIT 10');
                res.json(result.rows);
            } catch (err) {
              res.status(500).send(err.message);
            }
          });

          // TOP Clientes que mas han gastado
        app.get('/api/report/topClientes', async (req, res) => {
            try {
                console.log("TOP Clientes que mas han gastado");
                // no requiere ningun valor
                const result = await dbConnect.connect().query('SELECT nit, SUM(total) AS total_compra FROM contador.detalle_factura GROUP BY nit ORDER BY total_compra DESC LIMIT 10');
                res.json(result.rows);
            } catch (err) {
              res.status(500).send(err.message);
            }
          });

}
