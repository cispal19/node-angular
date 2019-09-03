'use strict'

var Favorito = require('../models/favorito');

function prueba(req,res){
	
if (req.params.nombre) {

	var nombre = req.params.nombre;
}else{

	var nombre = 'SIN NOMBRE';
}


	res.send({texto:"hola mundo node js "+nombre});
};


function getFavorito(req,res){
	var favoritoId = req.params.id;
	Favorito.findById(favoritoId,function(err,favorito){
		if(err){
			res.status(500).send({menssage:'eror al devolver el macador'});
		}else{
			if(!favorito){
			res.status(404).send({menssage:'No hay favorito'});
		}else{
			res.status(200).send({favorito});
		}
		}

	});
	
}

function getFavoritos(req,res){
	Favorito.find({}).sort('-_id').exec((err,favoritos) =>{
		if(err){
			res.status(500).send({menssage:'eror al devolver el macador'});
		}else{
		
			if(!favoritos){
					res.status(404).send({menssage:'No hay macadores'});
				}else{
					res.status(200).send({favoritos});
				}
		}
	});
	
}
function saveFavorito(req,res){
	var favorito = new Favorito();

	var params = req.body;
	favorito.title=params.title;
	favorito.description=params.description;
	favorito.url = params.url;

	favorito.save((err,favoritoStored) =>{
		if (err) {
			res.status(500).send({menssage:'eror al guardar el macador'});
		}else{
			res.status(200).send({favorito:favoritoStored});
		}
		
	});

	

	
}
function updateFavorito(req,res){
	var favoritoId = req.params.id;
	var update = req.body;
	console.log(update);

	Favorito.findByIdAndUpdate(favoritoId,update,(err,favoritoUpdated) =>{
			if (err) {
			res.status(500).send({menssage:'eror al actualziar el macador'});
		}else{
				res.status(200).send({favorito:favoritoUpdated});
		}
	


	});

}

function deleteFavorito(req,res){
	var favoritoId = req.params.id;
	Favorito.findById(favoritoId,function(err,favorito){
		if(err){
			res.status(500).send({menssage:'eror al devolver el macador'});
		}

		if(!favorito){
			res.status(404).send({menssage:'No hay favorito'});
		}else{

			favorito.remove(err => {
				if (err) {
					res.status(500).send({menssage:'eror al al borrar'});
				} else {
					res.status(200).send({menssage:'el marcador se ha eliminado!!!'});
				}
			});
		}

			
	});
	
}


module.exports={
	prueba,
	getFavorito,
	saveFavorito,
	deleteFavorito,
	updateFavorito,
	getFavoritos

}