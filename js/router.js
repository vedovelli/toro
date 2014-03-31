var webservice_uri = 'http://toro.ved:4730';

Toro.Router.map(function() {
	this.resource('ranking', function(){
		this.resource('candidato', {path: '/candidato/:id'});
	});
	this.resource('sobre');
});

Toro.RankingRoute = Ember.Route.extend({
  model: function(){
	return Ember.$.getJSON(webservice_uri + '/candidatos');
  }
});

Toro.CandidatoRoute = Ember.Route.extend({
	model: function(params){
		return Ember.$.getJSON(webservice_uri + '/candidato/'+params.id);
	}
});
