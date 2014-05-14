Toro.ToroLoginComponent = Ember.Component.extend({

	// tagName: 'ul',

	classNames: ['toro-login-box'],

	usuarioLogado: undefined,

	getLoggedUser: function(){
		var component = this;
		Toro.$.getJSON(Toro.configs.webservice_uri + '/usuario', function(data){
			component.set('usuarioLogado', data[0]);
		});
	}.on('didInsertElement'),

	actions: {

		facebook: function(){

			/*Guarda num cookie a URL atual, para retornar à ela após login com sucesso*/
			docCookies.setItem('return_path', window.location);

			/*Acessa a URL de autorizacao do Facebook. A lógica está toda no servidor*/
			window.location = Toro.configs.webservice_uri + '/auth/facebook';
		},

		facebookLogout: function(){

			/*Guarda num cookie a URL atual, para retornar à ela após login com sucesso*/
			docCookies.setItem('return_path', window.location);

			/*Acessa a URL de autorizacao do Facebook. A lógica está toda no servidor*/
			window.location = Toro.configs.webservice_uri + '/auth/logout';

		}
	}

});