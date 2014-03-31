
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
	    slug: String,
	    votos: {
			favor: Number,
			contra:  Number
		}
	});

	Candidato = mongoose.model('Candidato', candidatoSchema);

});



app.get('/ved', function(req, res){

	// Candidato.find(function(err, candidatos){
	// 	for(var i = 0; i< candidatos.length; i++){
	// 		var c = candidatos[i];
	// 		c.votos.favor = 0;
	// 		c.votos.contra = 0;
	// 		console.log(c.save());
	// 	}
	// });


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


app.get('/candidato/:slug', function(req, res){
	Candidato.find({slug: req.params.slug}, function(err, candidato){
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json(candidato[0]);
	});
});