// conexion de la base de datos;
const dbConnect = require('./ConectionDB/conectDB');

module.exports = (app) => {
    app.post('/api/cajero/viewClient', async (req, res) => {
        try {
            // requiere producto insert (codigo,nombre,precio,cantidad,subcursal)
          const {nit} = req.body || null;
          console.log("view client" + nit)
          const result = await dbConnect.connect().query('SELECT * FROM usuario.cliente_card WHERE nit = $1',[ nit ]);
          res.json(result.rows);
        } catch (err) {
          res.status(500).send(err.message);
        }
      });
}