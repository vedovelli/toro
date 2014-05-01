
Toro.MensagemController = Ember.ArrayController.extend({

	/*Garante que ao se incluir novo comentário, este será adicionado
	como primeiro item da lista e não no final, como é padrão*/
	sortProperties: ['data'],
    sortAscending: false,

	/*Torna o CandidatoController disponível para este controller
	e a sua View*/
	needs: ['candidato'],

	actions: {
		/*Responsável por salvar o comentário no servidor e adicionar
		o comentário recém adicionado à lista de comentários*/
		comentario: function(comentario, candidato){

			/*Model é a lista de comentários. Ver routes.js/MensagemRoute:model*/
			var model = this.get('model');

			/*Posta o comentário para o webservice*/
			Ember.$.post(
				Toro.configs.webservice_uri + '/comentario',
				{usuario: 1, candidato: candidato._id, comentario: comentario}
			).then(function(data){

				/*Adiciona o objeto retornado ao model*/
				model.pushObject(data);
			});

			/*Limpa a propriedade comentario, limpando também o campo textarea na View*/
			this.set('comentario', '');
		}
	}

});