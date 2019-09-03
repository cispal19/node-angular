'use strict'

var path = require('path');
var Image = require('../models/image');
var Album = require('../models/album');


function prueba(req,res){
    res.status(200).send({message:'Pruebas de controlador de imagenes'});
}

function getImage(req, res) {
    var imageId = req.params.id;
    Image.findById(imageId, (err, image) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!image) {
                res.status(404).send({ message: 'No  existe la imagen' });
            } else {
                Album.populate(image,{path:'album'},(err,image) =>{
                    if (err) {
                        res.status(500).send({ message: 'Error en la peticion' });
                    }else{
                        res.status(200).send({ image });
                    }

                });
                
            }

        }
    })

}

function saveImage(req, res) {
    var image = new Image();
    var params = req.body;
    image.title = params.title;
    image.picture = null;
    image.album = params.album;

    image.save((err,imageStored) =>{
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!imageStored) {
                res.status(404).send({ message: 'No  se guardo la imagen' });
            } else {
               
                res.status(200).send({ image: imageStored});
            }

        }
    });    
   

}

function getimages(req,res){
    var albumId = req.params.album;

    if (!albumId) {
        //sacar todas las imagenes de la bd
        var find=Image.find({}).sort('-title');
        
    } else {
        // sacar todas las imagenes asociadas al album
       var find= Image.find({album:albumId}).sort('-title');
        
    }
    find.exec((err,images) =>{
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            Album.populate(images,{path:'album'},(err,images) =>{
                if (!images) {
                    res.status(404).send({ message: 'Error en la peticion' });
                }else{
                    res.status(200).send({ images });
                }

            });
            
        }
    });


}

function updateImage(req, res) {
    var imageId = req.params.id;
    var update = req.body;
    Image.findByIdAndUpdate(imageId, update, function (err, imageUpdate) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {

            if (!imageUpdate) {
                res.status(404).send({ message: 'No se ha actualizado la imagen' });
            } else {
                res.status(200).send({ image: imageUpdate });
            }

        }
    });
}

function deleteImage(req, res) {
    var imageId = req.params.id;
    Image.findByIdAndRemove(imageId, function (err, imageDelete) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {

            if (!imageDelete) {
                res.status(404).send({ message: 'No se ha eleiminado la imagen' });
            } else {
                res.status(200).send({ image: imageDelete });
            }

        }
    });
}

function uploadImage(req,res){
    var imageId = req.params.id;
    var file_name = 'No subido';
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name=file_split[1];
       
        Image.findByIdAndUpdate(imageId, {picture:file_name}, function (err, imageUpdate) {
            if (err) {
                res.status(500).send({ message: 'Error en la peticion' });
            } else {
    
                if (!imageUpdate) {
                    res.status(404).send({ message: 'No se ha actualizado la imagen' });
                } else {
                    res.status(200).send({ image: imageUpdate });
                }
    
            }
        });
        
    } else {
        res.status(200).send({ message: 'No has subido una imagen' });
    }

}

var fs = require('fs');
function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    fs.exists('./uploads/'+imageFile,(exists) =>{
        if (exists) {
            res.sendFile(path.resolve('./uploads/'+imageFile));
       } else {
            res.status(200).send({ message: 'No existe la imagen !!' });
        }
    });
    
}

module.exports ={
    prueba,
    getImage,
    saveImage,
    getimages,
    updateImage,
    deleteImage,
    uploadImage,
    getImageFile
};