var Candidato,Usuario,mongoose=require("mongoose");mongoose.connect("mongodb://127.0.0.1/toro");var db=mongoose.connection;db.on("error",console.error.bind(console,"connection error:")),db.once("open",function o(){var o=mongoose.Schema({nome:String,sobrenome:String,slug:String,votos:{favor:Number,contra:Number}}),e=mongoose.Schema({id:Number,displayName:String,gender:String,provider:String,hometown:String,location:String});Candidato=mongoose.model("Candidato",o),Usuario=mongoose.model("Usuario",e)});var passport=require("passport"),FacebookStrategy=require("passport-facebook").Strategy;passport.use(new FacebookStrategy({clientID:"1433705530208473",clientSecret:"77dbcee96747a99e24a78806dcebca2b",callbackURL:"http://toro.ved:4730/auth/facebook/callback"},function(o,e,n,a){var t;Usuario.find({id:n.id},function(o,e){return o?a(o):(0===e.length?t=new Usuario({id:n.id,displayName:n.displayName,gender:n.gender,provider:n.provider,hometown:n._json.hometown,location:n._json.location}):(t=e[0],t.id=n.id,t.displayName=n.displayName,t.gender=n.gender,t.provider=n.provider,t.hometown=n._json.hometown,t.location=n._json.location),t.save(),passport.serializeUser(function(o,e){e(null,o.id)}),passport.deserializeUser(function(o,e){Usuario.find({id:o},function(o,n){e(o,n)})}),void a(null,t))})}));var express=require("express"),app=express();app.listen(4730),app.configure(function(){app.use(express.static("public")),app.use(express.cookieParser()),app.use(express.bodyParser()),app.use(express.session({secret:"tororoto"})),app.use(passport.initialize()),app.use(passport.session()),app.use(app.router)}),app.get("/auth/facebook",passport.authenticate("facebook")),app.get("/auth/facebook/callback",passport.authenticate("facebook",{successRedirect:"/auth/facebook/ok",failureRedirect:"/login"})),app.get("/auth/facebook/ok",function(o,e){e.redirect("http://toro.ved/")}),app.get("/login",function(o,e){e.type("text/plain"),e.send("login route")}),app.get("/ved",function(o,e){}),app.get("/",function(o,e){e.type("text/plain"),e.send("Toro")}),app.get("/candidatos",function(o,e){var n=Candidato.find(function(o,n){e.setHeader("Access-Control-Allow-Origin","*"),e.json(n)})}),app.get("/candidato/:slug",function(o,e){Candidato.find({slug:o.params.slug},function(o,n){e.setHeader("Access-Control-Allow-Origin","*"),e.json(n[0])})});