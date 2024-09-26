const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//llamando a route
const employeer = require('./employeerRoute');
const admin = require('./adminRoute');
const bodega = require('./bodegaRoute');
const client = require('./clientRoute');
const cajero = require('./cajeroRoute');
const report = require('./reportRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// route de empleado
employeer(app);
admin(app);
bodega(app);
client(app);
cajero(app);
report(app);



app.listen(3002, () => {
  console.log('Servidor backend ejecutándose en el puerto 3002');
});
