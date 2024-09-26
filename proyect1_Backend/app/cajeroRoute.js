// conexion de la base de datos;
const dbConnect = require('./ConectionDB/conectDB');

// exporta los modulos a app.js
module.exports = (app) => {
    
    app.post('/api/cajero/InsertFacturaInit', async (req, res) => {
        try {
          const {no_factura,cajero,nit} = req.body || null;
          console.log("Insert Factura No. "+no_factura);
          // no requiere ningun valor
          const result = await dbConnect.connect().query('CALL contador.insert_facturaInit($1,$2,$3)',[no_factura,cajero,nit]);
          res.json(result.rows);
          } catch (err) {
          res.status(500).send(err.message);
          }
    });

      app.post('/api/cajero/InsertProductFactura', async (req, res) => {
        try {
          const {no_factura,cod_producto,cantidad} = req.body || null;
          console.log("Insert Product COD. "+cod_producto+" no_factura "+no_factura);
          // no requiere ningun valor
          const result = await dbConnect.connect().query('CALL contador.insert_productFactura($1,$2,$3)',[no_factura,cod_producto,cantidad]);
          res.json(result.rows);
          } catch (err) {
          res.status(500).send(err.message);
          }
      });
      
      app.post('/api/cajero/viewProductFactura', async (req, res) => {
        try {
          const {no_factura} = req.body || null;
          console.log("View Product FACTURA NO. "+no_factura);
          // no requiere ningun valor
          const result = await dbConnect.connect().query('SELECT cod_producto, name, cantidad, precio, total FROM contador.detalle_factura WHERE no_factura = $1',[no_factura]);
          res.json(result.rows);
          } catch (err) {
          res.status(500).send(err.message);
          }
      }); 

      app.post('/api/cajero/totalFactura', async (req, res) => {
        try {
          const {no_factura} = req.body || null;
          console.log("View Product FACTURA NO. "+no_factura);
          // no requiere ningun valor
          const result = await dbConnect.connect().query('SELECT SUM(total) AS total_pagar FROM contador.detalle_factura WHERE no_factura = $1',[no_factura]);
          res.json(result.rows);
          } catch (err) {
          res.status(500).send(err.message);
          }
      }); 
}