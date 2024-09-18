// conexion de la base de datos;
const dbConnect = require('./ConectionDB/conectDB');
// exporta los modulos a app.js
module.exports = (app) => {

    app.post('/api/bodega/insertProduct', async (req, res) => {
        try {
            // requiere producto insert (codigo,nombre,precio,cantidad,subcursal)
          const {cod, name, precio, cantidad, subcursal} = req.body || null;
          const result = await dbConnect.connect().query('SELECT almacen.insert_producto($1,$2,$3,$4,$5)',[ cod, name, precio, cantidad, subcursal ]);
          res.json(result.rows);
        } catch (err) {
          res.status(500).send(err.message);
        }
      });
}