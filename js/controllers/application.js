
Toro.ApplicationController = Ember.ObjectController.extend({

	isShowingMessages: false,

	actions: {
		facebook: function(){
			docCookies.setItem('return_path', window.location);
			window.location = Toro.configs.webservice_uri + '/auth/facebook';
		}
	}
});