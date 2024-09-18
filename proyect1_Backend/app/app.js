const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Configuración de la base de datos
const dbConnect = require('./ConectionDB/conectDB');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.post('/api/empleado_type', async (req, res) => {
  try {
    const {user, pass} = req.body;
    console.log(user+" "+pass)
    const result = await dbConnect.connect().query('SELECT personal.type_personal($1,$2)',[ user , pass ]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post('/api/empleado_exist', async (req, res) => {
  try {
    const {user, pass} = req.body;
    console.log(user+" "+pass)
    const result = await dbConnect.connect().query('SELECT personal.exist_personal($1,$2)',[ user , pass ]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3002, () => {
  console.log('Servidor backend ejecutándose en el puerto 3002');
});
