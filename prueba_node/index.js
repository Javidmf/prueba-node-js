const express = require('express');
const app = express();
const config = require('./config.js');
const port = config.api.port;

app.get('/' , (req , res)=>{

   res.send('It\'s working')

})

app.listen(port, () => {
    console.log('Api escuchando en el puerto ', port);
})