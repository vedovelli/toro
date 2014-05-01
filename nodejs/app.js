
var client_url = 'http://toro.ved';
var db_url = 'mongodb://127.0.0.1/toro';


/*Database setup, init & models*/
var Candidato;
var Usuario; // model
var usuario; // usuario logado
var Comentario;
var mongoose = require('mongoose').connect(db_url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){

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

	var usuarioSchema = mongoose.Schema({
		id: Number,
		displayName: String,
		gender: String,
		provider: String,
		hometown: String,
		location: String,
		avatar: String
	});

	var comentarioSchema = mongoose.Schema({
		usuario: Number,
		candidato: String,
		comentario: String,
		data: Date
	});

	Candidato = mongoose.model('Candidato', candidatoSchema);
	Usuario = mongoose.model('Usuario', usuarioSchema);
	Comentario = mongoose.model('Comentario', comentarioSchema);

});


/*Passport (authentication module)*/
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
		clientID: '1433705530208473',
		clientSecret: '77dbcee96747a99e24a78806dcebca2b',
		callbackURL: "http://toro.ved:4730/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		Usuario.findOne({id: profile.id}, function(err, user) {
			if (err) { return done(err); }
			if (user) {
				user.id = profile.id,
				user.displayName = profile.displayName,
				user.gender = profile.gender,
				user.provider = profile.provider,
				user.hometown = profile._json.hometown.name,
				user.location = profile._json.location.name,
				user.avatar = 'https://graph.facebook.com/'+profile.username+'/picture'
			} else {
				user = new Usuario({
					id: profile.id,
					displayName: profile.displayName,
					gender: profile.gender,
					provider: profile.provider,
					hometown: profile._json.hometown.name,
					location: profile._json.location.name,
					avatar: 'https://graph.facebook.com/'+profile.username+'/picture'
				});
			}

			user.save();

			passport.serializeUser(function(user, done) {
			  done(null, user.id);
			});

			passport.deserializeUser(function(id, done) {
			  Usuario.find({id: id}, function(err, user) {
			    done(err, user);
			  });
			});

			return done(null, user);

		});

	}
));


/*App setup & init*/
var express = require('express');
var app = express();
var MongoStore = require('connect-mongo')(express);

app.listen(4730);
app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({secret: 'tororoto'}));
  // app.use(express.cookieSession({secret: 'tororoto'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/auth/facebook/ok', failureRedirect: '/login' }));

app.get('/auth/facebook/ok', function(req, res){
	usuario = req.user;
	res.redirect(client_url);
});

app.get('/login', function(req, res){
	res.type('text/plain');
	res.send('login route');
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
app.get('/comentarios/:candidato', function(req, res){
	Comentario.find({candidato: req.params.candidato}).sort('-data').exec(function(err, comentarios){
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json(comentarios);
	});
});

app.post('/comentario', function(req, res){

	var comentario = new Comentario({
		usuario: req.body.usuario,
		candidato: req.body.candidato,
		comentario: req.body.comentario,
		data: new Date
	});

	comentario.save();

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(comentario);

});

app.get('/voto/:candidato/:voto', function(req, res){

	/*TODO
		- implementar verificação de usuário já ter votado
		- implementar a validação para aumentar a segurança
		- retornar mensagem de erro
	*/

	var response_obj;
	res.setHeader("Access-Control-Allow-Origin", "*");

	Candidato.find({_id: req.params.candidato}, function(err, candidato){
		if(candidato){
			if(req.params.voto === 'favor'){
				candidato[0].votos.favor++;
			} else if(req.params.voto === 'contra'){
				candidato[0].votos.contra++;
			}
			candidato[0].save();
			response_obj = {
				response: true,
				message: 'voto salvo com sucesso.'
			};
		} else {
			response_obj = {
				response: false,
				message: 'candidato não localizado.'
			}
		}
		res.json(response_obj);
	});
});

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

app.get('/usuario', function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(usuario);
});