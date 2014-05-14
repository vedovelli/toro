Toro.ToroLoginComponent = Ember.Component.extend({

	/*Classes CSS que serão inseridas no wrapper do componente. Neste caso o default que é um <div>*/
	classNames: ['toro-login-box'],

	/*Esta propriedade guardará o usuário logado*/
	usuarioLogado: undefined,

	/*Ao inserir o componente na View, pede ao servidor o usuario logado*/
	getLoggedUser: function(){

		/*Guarda uma referência ao próprio componente*/
		var component = this;

		/*Chamada AJAX que pede ao server o usuário logado*/
		Toro.$.getJSON(Toro.configs.webservice_uri + '/usuario', function(data){

			/*Seta o usuário retornado pelo servidor*/
			component.set('usuarioLogado', data[0]);
		});

	/*Event listener que executa o método acima quando o componente for inserido na View*/
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

			window.location = Toro.configs.webservice_uri + '/auth/logout';

		}
	}

});