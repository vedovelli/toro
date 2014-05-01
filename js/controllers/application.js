
Toro.ApplicationController = Ember.ObjectController.extend({

	/*Propriedade utilizada para mostrar e esconder a lista de comentarios*/
	isShowingMessages: false,

	actions: {

		facebook: function(){

			/*Guarda num cookie a URL atual, para retornar à ela após login com sucesso*/
			docCookies.setItem('return_path', window.location);

			/*Acessa a URL de autorizacao do Facebook. A lógica está toda no servidor*/
			window.location = Toro.configs.webservice_uri + '/auth/facebook';
		}
	}
});
