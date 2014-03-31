
/*App setup & init*/
var express = require('express');
var app = express();
app.listen(4730);




/*Database setup, init & models*/
var Candidato;
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/toro');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

	/*Models*/
	var candidatoSchema = mongoose.Schema({
	    nome: String,
	    sobrenome: String,
	    slug: String
	});

	Candidato = mongoose.model('Candidato', candidatoSchema);

});



app.get('/ved', function(req, res){

	Candidato.remove({ _id: '53399c47475f7dccc5a095f6' }, function(err, candidato){
		var data = candidato[0];
		res.json(data);
	});


});



/*Main route*/
app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('Toro');
});


/*Other routes*/
app.get('/candidatos', function(req, res){
	var candidatos = Candidato.find(function(err, candidatos){
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json(candidatos);
	});
});


app.get('/candidato/:id', function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({id: 1,nome: 'Dilma', sobrenome: 'Roussef'});
});