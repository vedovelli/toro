var express = require('express');
var app = express();

app.listen(4730);

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('Toro®');
});


app.get('/candidatos', function(req, res){
	var candidatos = [
		{id: 1,nome: 'Dilma', sobrenome: 'Roussef'},
		{id: 2,nome: 'Aécio', sobrenome: 'Neves'},
		{id: 3,nome: 'Eduardo', sobrenome: 'Campos'},
	];
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(candidatos);
});

app.get('/candidato/:id', function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({id: 1,nome: 'Dilma', sobrenome: 'Roussef'});
});