Toro.Router.map(function() {
	this.resource('ranking', function(){
		this.resource('candidato', {path: '/candidato/:slug'});
	});
	this.resource('sobre');
});

Toro.RankingRoute = Ember.Route.extend({
	model: function(){
		return Ember.$.getJSON(Toro.configs.webservice_uri + '/candidatos');
	}
});

Toro.CandidatoRoute = Ember.Route.extend({
	model: function(params){
		return Ember.$.getJSON(Toro.configs.webservice_uri + '/candidato/'+params.slug);
	}
});
