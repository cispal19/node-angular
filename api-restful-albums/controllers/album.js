'use strict'

var Album = require('../models/album');

function getAlbum(req, res){
    var albumId = req.params.id;

    Album.findById(albumId,(err,album) =>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!album){
                res.status(404).send({message:'El album no existe'});
            }else{
                res.status(200).send({album});
            }
        }
    });

}

function getAlbums(req, res){
   

    Album.find({},(err,albums) =>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!albums){
                res.status(404).send({message:'El album no existe'});
            }else{
                res.status(200).send({albums});
            }
        }
    });

}

function saveAlbum(req,res){
    var album = new Album();
    var params = req.body;

    album.title =params.title;
    album.description = params.description;

    album.save((err,albumStored) =>{
        if (err) {
            res.status(500).send({message:'Error al guardar el album'});
        } else {
            if(!albumStored){
                res.status(404).send({message:'No se guardo el album'});
            }else{
                res.status(200).send({album:albumStored});
            }
        }
    });
}

function updateAlbum(req,res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId,update, function(err,albumUpdate){
        if (err) {
            res.status(500).send({message:'Error al actualizar el album'});
        } else {
            if(!albumUpdate){
                res.status(404).send({message:'No se actualizo el album'});
            }else{
                res.status(200).send({album:albumUpdate});
            }
            
        }

    })
}

function deleteAlbum(req,res){
    var albumId = req.params.id;
  

    Album.findByIdAndRemove(albumId, function(err,albumRemove){
        if (err) {
            res.status(500).send({message:'Error al eliminar el album'});
        } else {
            if(!albumRemove){
                res.status(404).send({message:'No se elimino el album'});
            }else{
                res.status(200).send({album:albumRemove});
            }
            
        }

    })
}

module.exports={
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum
};