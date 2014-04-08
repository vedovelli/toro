
Toro.Router.map(function() {

	this.resource('ranking', function(){
		this.resource('candidato', {path: '/candidato/:slug'}, function(){
			this.resource('mensagem', {path: '/mensagens/:id'});
		});
	});

	this.resource('sobre');

	this.resource('voto', {path: '/voto/:id/:slug/:voto'});

});

Toro.MensagemRoute = Ember.Route.extend({

	model: function(params){
		return Ember.$.getJSON(Toro.configs.webservice_uri + '/comentarios/'+ params.id);
	}

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
		Toro.VotacaoView.reset();
		this.transitionTo('candidato', this.slug);
	}

});

Toro.RankingRoute = Ember.Route.extend({

	model: function(){
		return Ember.$.getJSON(Toro.configs.webservice_uri + '/candidatos');
	}

});

Toro.CandidatoRoute = Ember.Route.extend({

	beforeModel: function(){
		this.controllerFor('application').set('isShowingMessages', false);
	},

	model: function(params){
		return Ember.$.getJSON(Toro.configs.webservice_uri + '/candidato/' + params.slug);
	}

});
