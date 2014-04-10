
Toro.MensagemController = Ember.ArrayController.extend({

	sortProperties: ['data'],

    sortAscending: false,

	needs: ['candidato'],

	actions: {
		comentario: function(comentario, candidato){
			var model = this.get('model');
			Ember.$.post(Toro.configs.webservice_uri + '/comentario', {usuario: 1, candidato: candidato._id, comentario: comentario}).then(function(data){
				model.pushObject(data); // adiciona o objeto retornado ao model
			});
			this.set('comentario', '');
		}
	}

});