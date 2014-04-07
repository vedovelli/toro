
Toro.CandidatoController = Ember.ObjectController.extend({

	needs: 'application',

	actions: {

		mostrar_mensagens: function(){
			var application = this.get('controllers.application');

			if(application.isShowingMessages){
				application.set('isShowingMessages', false);
				this.transitionToRoute('candidato');
			} else {
				application.set('isShowingMessages', !this.isShowingMessages);
				this.transitionToRoute('mensagem');
			}
		},

		voto_favor: function(id, slug) {
			this.transitionToRoute('voto', id, slug, 'favor');
		},

		voto_contra: function(id, slug) {
			this.transitionToRoute('voto', id, slug, 'contra');
		}
	}

});
