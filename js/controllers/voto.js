
Toro.VotoController = Ember.ObjectController.extend({

	/*Esconde a lista de comentários sobre o candidado*/
	resetView: function(){
		Toro.VotacaoView.reset();
	}

});
