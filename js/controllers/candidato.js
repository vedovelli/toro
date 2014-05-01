
Toro.CandidatoController = Ember.ObjectController.extend({

	/*Torna o ApplicationController disponível para este controller
	e a sua View*/
	needs: 'application',

	actions: {

		/*Mostra/Esconde a lista de mensagens*/
		mostrar_mensagens: function(){
			var application = this.get('controllers.application');

			/*A propriedade usada para toggle é guardada globalmente pois
			é também utilizada por outros controllers*/
			if(application.isShowingMessages){
				application.set('isShowingMessages', false);
				this.transitionToRoute('candidato');
			} else {
				application.set('isShowingMessages', !this.isShowingMessages);
				this.transitionToRoute('mensagem');
			}
		},

		/*Votar a favor.
		TODO migrar para action ao invés de rota*/
		voto_favor: function(id, slug) {
			this.transitionToRoute('voto', id, slug, 'favor');
		},

		/*Votar contra.
		TODO migrar para action ao invés de rota*/
		voto_contra: function(id, slug) {
			this.transitionToRoute('voto', id, slug, 'contra');
		}
	}

});
