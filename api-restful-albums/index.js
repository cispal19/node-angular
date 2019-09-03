'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 3700;


mongoose.connect('mongodb://localhost:27017/app_albums',(err,res) =>{
    if(err){
        throw err;
    }else{
        console.log("Base de datos funcionando coorrectamente");
        app.listen(port,()=>{
            console.log('API RESTFULT DE ALBUMS ESCUCHANDO-.......');
        });
    }
});