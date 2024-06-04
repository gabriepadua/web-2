//nodemon app.js para startar no terminal

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/taskman') //conecta com o banco, caso necessário, adicionar , { useNewUrlParser: true, useUnifiedTopology: true}
    .then(() => 
        console.log('Connected to MongoDB')) //mostra que conectou
        .catch((error) => console.log(error)); //mostra o erro

module.exports = { mongoose };