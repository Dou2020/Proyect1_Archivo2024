// conexion de la base de datos;
const dbConnect = require('./ConectionDB/conectDB');

// exporta los modulos a app.js
module.exports = (app) => {
    
    // Existe el empleado
    app.post('/api/empleado/exist', async (req, res) => {
        try {

        // requiere usuario y password
          const {user, pass} = req.body;
          console.log(user+" "+pass)
          const result = await dbConnect.connect().query('SELECT personal.exist_personal($1,$2)',[ user , pass ]);
          res.json(result.rows);
        } catch (err) {
          res.status(500).send(err.message);
        }
      });
    
    app.post('/api/empleado/type', async (req, res) => {
        try {
          const {usuario, pass} = req.body;
          console.log(usuario+" "+pass)
          const result = await dbConnect.connect().query('SELECT personal.type_personal($1,$2)',[ usuario , pass ]);
          res.json(result.rows);
        } catch (err) {
          res.status(500).send(err.message);
        }
    });

    app.post('/api/empleado/value', async (req, res) => {
      try {
        const {usuario, pass} = req.body;
        console.log(usuario+" "+pass)
        const result = await dbConnect.connect().query('SELECT * FROM personal.value_personal($1,$2)',[ usuario , pass ]);
        res.json(result.rows);
      } catch (err) {
        res.status(500).send(err.message);
      }
  });
}