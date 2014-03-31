Toro.Router.map(function() {
	this.resource('ranking', function(){
		this.resource('candidato', {path: '/candidato/:id'});
	});
	this.resource('sobre');
});

Toro.RankingRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('candidatos');
  }
});

Toro.CandidatoRoute = Ember.Route.extend({
	model: function(params){
		return this.store.find('candidatos', params.id);
	}
});
