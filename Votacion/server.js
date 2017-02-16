var express = require('express');
var parser = require('body-parser');
var urlParser = parser.urlencoded({extended:false});
var fs = require('fs');

var app = express();
//Especificar el motor de vistas
app.set('view engine', 'ejs');
//Super importante

app.post('/login', urlParser, function(req, res){
	console.log(req.body.usuario);
	console.log(req.body.clave);
	var mensaje = {found:false};
	/////////////////////
	fs.readFile( __dirname + "/" + "base.json", 'utf8', 
		function (err, data) {
		data = JSON.parse(data);
        users = data.administrador;
        console.log(users);
    ///////////////////
		for (var i = users.length - 1; i >= 0; i--) {
			if (users[i].usuario == req.body.usuario 
				&& users[i].clave == req.body.clave)
			{
				mensaje.found = true;
				mensaje.user = users[i];
			}
		}
		res.send(JSON.stringify(mensaje));
	});
});

app.post('/loginVotante', urlParser, function(req, res){
	console.log(req.body.cedula);
	var mensaje = {found:false};
	/////////////////////
	fs.readFile( __dirname + "/" + "base.json", 'utf8', 
		function (err, data) {
		data = JSON.parse(data);
        users = data.votante;
        console.log(users);
    ///////////////////
		for (var i = users.length - 1; i >= 0; i--) {
			if (users[i].cedula == req.body.cedula)
			{
				mensaje.found = true;
				mensaje.user = users[i];
			}
		}
		res.send(JSON.stringify(mensaje));
	});
});

app.get('/perfil/:usuario', function(req, res){
	var objUser = {};
	var nick = req.params.usuario;
	
	fs.readFile( __dirname + "/" + "base.json", 'utf8', 
		function (err, data) {
		var data = JSON.parse(data);
        var users = data.administrador;
        for (var i = users.length - 1; i >= 0; i--) {
			if (users[i].usuario == nick)
			{
				objUser = users[i];
			}
		}
		res.render('indexAdministrador',{'perfil':objUser});
    });

});

app.get('/votante/:usuario', function(req, res){
	var objUser = {};
	var nick = req.params.usuario;
	
	fs.readFile( __dirname + "/" + "base.json", 'utf8', 
		function (err, data) {
		var data = JSON.parse(data);
        var users = data.votante;
        for (var i = users.length - 1; i >= 0; i--) {
			if (users[i].usuario == nick)
			{
				objUser = users[i];
			}
		}
		res.render('perfilVotante',{'perfil':objUser});
    });

});


app.use(express.static('public'));

app.listen(3000);

console.log('Server listening 3000!');
