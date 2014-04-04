Toro.Router.map(function() {

	this.resource('ranking', function(){
		this.resource('candidato', {path: '/candidato/:slug'});
	});

	this.resource('voto', {path: '/voto/:id/:slug/:voto'});

	this.resource('sobre');
});

Toro.VotoRoute = Ember.Route.extend({

	slug: null,

	model: function(params){
		this.slug = params.slug;
		return Ember.$.getJSON(Toro.configs.webservice_uri + '/voto/' + params.id +'/'+ params.voto);
	},

	afterModel: function(model) {
		if(model.response === false){
			alert(model.message);
		}
		this.transitionTo('candidato', this.slug);
	}

});

Toro.RankingRoute = Ember.Route.extend({

	model: function(){
		return Ember.$.getJSON(Toro.configs.webservice_uri + '/candidatos');
	}

});

Toro.CandidatoRoute = Ember.Route.extend({

	model: function(params){
		return Ember.$.getJSON(Toro.configs.webservice_uri + '/candidato/' + params.slug);
	}

});
