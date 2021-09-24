const express = require('express');
const app = express();
const config = require('./config.js');
const port = config.api.port;
const router = require('./routes/routerFile');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
    console.log('Api escuchando en el puerto ', port);
})

module.exports = app;