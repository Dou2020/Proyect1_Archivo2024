// conexion de la base de datos;
const dbConnect = require('./ConectionDB/conectDB');
// exporta los modulos a app.js
module.exports = (app) => {

    app.post('/api/bodega/insertProduct', async (req, res) => {
        try {
            // requiere producto insert (codigo,nombre,precio,cantidad,subcursal)
          const {codigo, nombre, precio, cantidad, subcursal} = req.body || null;
          console.log("insert product"+codigo)
          const result = await dbConnect.connect().query('SELECT almacen.insert_producto($1,$2,$3,$4,$5)',[ codigo, nombre, precio, cantidad, subcursal ]);
          res.json(result.rows);
        } catch (err) {
          res.status(500).send(err.message);
        }
      });

      // list Product of Bodega
      app.post('/api/bodega/selectProduct', async (req, res) => {
        try {
            // requiere producto insert (subcursal)
          const {sub} = req.body || null;
          console.log(sub);
          const result = await dbConnect.connect().query('SELECT * FROM almacen.product_bodega WHERE subcursal=$1 OR subcursal=$2',[ sub,"N/A" ]);
          res.json(result.rows);
        } catch (err) {
          res.status(500).send(err.message);
        }
      });

      // list Product Details
      app.post('/api/bodega/selectProductDetail', async (req, res) => {
        try {
            // requiere producto insert (subcursal)
          const {sub,cod} = req.body || null;
          console.log(sub+" "+cod);
          const result = await dbConnect.connect().query('SELECT * FROM almacen.product_bodega WHERE (subcursal=$1 AND cod_producto=$2) OR (cod_producto=$2 AND subcursal=$3)',[ sub, cod,'N/A' ]);
          res.json(result.rows);
        } catch (err) {
          res.status(500).send(err.message);
        }
      });

}