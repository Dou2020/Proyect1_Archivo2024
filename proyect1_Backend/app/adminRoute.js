// conexion de la base de datos;
const dbConnect = require('./ConectionDB/conectDB');

// exporta los modulos a app.js
module.exports = (app) => {

    // select VIEW usuario.cliente_card
    app.get('/api/admin/userCard', async (req, res) => {
        try {
            console.log("list user_Card");
            // no requiere ningun valor
            const result = await dbConnect.connect().query('SELECT * FROM usuario.cliente_card');
            res.json(result.rows);
        } catch (err) {
          res.status(500).send(err.message);
        }
      });

          // select VIEW usuario.cliente_card
    app.get('/api/admin/viewEmployees', async (req, res) => {
      try {
          console.log("list of employees ");
          // no requiere ningun valor
          const result = await dbConnect.connect().query('SELECT * FROM personal.view_employees');
          res.json(result.rows);
      } catch (err) {
        res.status(500).send(err.message);
      }
    });
    
          // select VIEW usuario.cliente_card
    app.post('/api/admin/updateCard', async (req, res) => {
      try {
        const {card} = req.body || null;
        console.log("update type card "+card);
        // no requiere ningun valor
        const result = await dbConnect.connect().query('CALL usuario.update_tipo_card($1)',[card]);
        res.json(result.rows);
        } catch (err) {
        res.status(500).send(err.message);
        }
    });
          // select VIEW usuario.cliente_card
          app.post('/api/admin/viewEmployee', async (req, res) => {
            try {
              const {usuario} = req.body || null;
              console.log("view employee "+usuario);
              // no requiere ningun valor
              const result = await dbConnect.connect().query('SELECT * FROM personal.view_employees WHERE usuario = $1',[usuario]);
              res.json(result.rows);
              } catch (err) {
              res.status(500).send(err.message);
              }
          });

          // select usuario.cliente_card
          app.post('/api/admin/updateEmployee', async (req, res) => {
            try {
              const {usuario,nombre,pass} = req.body || null;
              console.log("update Employee "+usuario);
              // no requiere ningun valor
              const result = await dbConnect.connect().query('CALL personal.update_employee($1,$2,$3)',[usuario,nombre,pass]);
              res.json(result.rows);
              } catch (err) {
              res.status(500).send(err.message);
              }
          });

          // select usuario.cliente_card
          app.post('/api/admin/insertEmployee', async (req, res) => {
            try {
              const {usuario,nombre,subcursal,rol, pass} = req.body || null;
              console.log("Insert Employee "+usuario);
              // no requiere ningun valor
              const result = await dbConnect.connect().query('CALL personal.insert_employee($1,$2,$3,$4,$5)',[usuario,nombre,rol,subcursal,pass]);
              res.json(result.rows);
              } catch (err) {
              res.status(500).send(err.message);
              }
          });          


}