window.Toro = Ember.Application.create({
  // LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true
});

/*Config info*/
Toro.configs ={};
Toro.configs.webservice_uri = 'http://toro.ved:4730';
Toro.configs.root_uri = 'http://toro.ved/';

/*Configura a biblioteca Moment.js*/
moment.lang('pt_BR');

/*Redirectiona para URL presente no browser no momento do login
e solicita ao backend os dados do usuario logado*/
var return_path = docCookies.getItem('return_path');
if(return_path !== null) {
  docCookies.removeItem('return_path');
  window.location = return_path;
}