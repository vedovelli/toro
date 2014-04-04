Toro.VotacaoView = Ember.View.create({

	templateName: 'votacao',

	// voto_favor: function(data, event){
	// 	window.console.log(data);
	// },

	click: function(event){ // event é um objeto jQuery passado automaticamente pelo Ember

		var elem = Ember.$(event.target);
		var elems = Ember.$(event.currentTarget.children);

		if(elem.is('button')){ // Existe um elemento Ember encapsulando os botões e um clique nele não nos interessa.

			elems.removeClass('votar-button-disabled');
			elems.removeAttr('disabled');
			elem.addClass('votar-button-disabled');
			elem.attr('disabled', 'disabled');

		}

	}

});