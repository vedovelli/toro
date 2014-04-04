
Toro.CandidatoController = Ember.ObjectController.extend({

	actions: {
		voto_favor: function(id, slug) {
			this.transitionToRoute('voto', id, slug, 'favor');
		},

		voto_contra: function(id, slug) {
			this.transitionToRoute('voto', id, slug, 'contra');
		}
	}

});
