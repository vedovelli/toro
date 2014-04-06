
Toro.Router.map(function() {

	this.resource('ranking', function(){
		this.resource('candidato', {path: '/candidato/:slug'}, function(){
			this.resource('mensagem', {path: '/mensagens'});
		});
	});

	this.resource('voto', {path: '/voto/:id/:slug/:voto'});

	this.resource('sobre');

});

Toro.MensagemRoute = Ember.Route.extend({

	model: function(){
		return [
			{mensagem: 'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.'},
			{mensagem: 'Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui. Nullam leo erat, aliquet quis tempus a, posuere ut mi. Ut scelerisque neque et turpis posuere pulvinar pellentesque nibh ullamcorper. Pharetra in mattis molestie, volutpat elementum justo. Aenean ut ante turpis. Pellentesque laoreet mé vel lectus scelerisque interdum cursus velit auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac mauris lectus, non scelerisque augue. Aenean justo massa.'},
			{mensagem: 'Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui. Nullam leo erat, aliquet quis tempus a, posuere ut mi. Ut scelerisque neque et turpis posuere pulvinar pellentesque nibh ullamcorper. Pharetra in mattis molestie, volutpat elementum justo. Aenean ut ante turpis. Pellentesque laoreet mé vel lectus scelerisque interdum cursus velit auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac mauris lectus, non scelerisque augue. Aenean justo massa.'},
			{mensagem: 'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.'},
			{mensagem: 'Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui. Nullam leo erat, aliquet quis tempus a, posuere ut mi. Ut scelerisque neque et turpis posuere pulvinar pellentesque nibh ullamcorper. Pharetra in mattis molestie, volutpat elementum justo. Aenean ut ante turpis. Pellentesque laoreet mé vel lectus scelerisque interdum cursus velit auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac mauris lectus, non scelerisque augue. Aenean justo massa.'},
		];
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

	model: function(params){
		return Ember.$.getJSON(Toro.configs.webservice_uri + '/candidato/' + params.slug);
	}

});
