// conexion de la base de datos;
const dbConnect = require('./ConectionDB/conectDB');

// exporta los modulos a app.js
module.exports = (app) => {

    // select VIEW usuario.cliente_card
    app.get('/api/admin_userCard', async (req, res) => {
        try {
            // no requiere ningun valor
            const result = await dbConnect.connect().query('SELECT * FROM usuario.cliente_card');
            res.json(result.rows);
        } catch (err) {
          res.status(500).send(err.message);
        }
      });

}