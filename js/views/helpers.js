
/* Formata a data padrão Javascript para o padrão 'um dia atrás' ou 'alguns segundos atrás'*/
Ember.Handlebars.helper('data-publicacao', function(){
	var markup ='';
	markup += ' <small>';
	markup += moment(this.data).calendar(); //this é o objeto Mensagem, o item do loop
	markup += '</small>';
	return new Handlebars.SafeString( markup );
});