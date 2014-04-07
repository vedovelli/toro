
Toro.MensagemController = Ember.ArrayController.extend({

	needs: ['candidato'],

	actions: {
		comentario: function(comentario){
			Ember.$.post(Toro.configs.webservice_uri + '/comentario', {comentario: comentario}).then(function(data){
				moment.lang('pt_BR');
				window.console.log(moment(data.response).fromNow());
			});
		}
	}

});