const express = require('express');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');

const cors = require('cors');
require('dotenv').config();

const APIroutes = require('./src/routes');

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.log("Erro: ", error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(__dirname+'/public'));

server.use('/', APIroutes);

server.listen(process.env.PORT, ()=>{
    console.log("- rodando no endereço: " + process.env.BASE);
});