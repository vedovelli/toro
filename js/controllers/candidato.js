
Toro.CandidatoController = Ember.ObjectController.extend({

	isShowingMessages: false,

	actions: {

		mostrar_mensagens: function(){
			if(this.isShowingMessages){
				this.set('isShowingMessages', false);
				this.transitionToRoute('candidato');
			} else {
				this.transitionToRoute('mensagem');
				this.set('isShowingMessages', !this.isShowingMessages);
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
