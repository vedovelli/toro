Toro.VotacaoView = Ember.View.create({

	templateName: 'votacao',

	elements: null,

	reset: function(){
		this.elements.removeClass('votar-button-disabled');
		this.elements.removeAttr('disabled');
	},

	click: function(event){ // event é um objeto jQuery passado automaticamente pelo Ember

		var elem = Ember.$(event.target);
		this.elements = Ember.$(event.currentTarget.children);

		if(elem.is('button')){ // Existe um elemento Ember encapsulando os botões e um clique nele não nos interessa.

			this.reset();
			elem.addClass('votar-button-disabled');
			elem.attr('disabled', 'disabled');

		}

	}

});