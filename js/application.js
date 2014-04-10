window.console.log(document.cookie);

window.Toro = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true
});

// Toro.Store = DS.Store.extend();

/*Config info*/
Toro.configs ={};
Toro.configs.webservice_uri = 'http://toro.ved:4730';
Toro.configs.root_uri = 'http://toro.ved/';


/*
  configura a biblioteca Moment.js
*/
moment.lang('pt_BR');


/*
  Remove o hash colocado pelo Facebook
*/
// From https://github.com/jaredhanson/passport-facebook/issues/12#issuecomment-5913711
// Remove the ugly Facebook appended hash
// <https://github.com/jaredhanson/passport-facebook/issues/12>
if (window.location.hash && window.location.hash === "#_=_") {
  // If you are not using Modernizr, then the alternative is:
  //   `if (window.history && history.pushState) {`
  if (Modernizr.history) {
    window.history.pushState("", document.title, window.location.pathname);
  } else {
  // Prevent scrolling by storing the page's current scroll offset
    var _scroll = {
      top: document.body.scrollTop,
      left: document.body.scrollLeft
    };
    window.location.hash = "";
    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = _scroll.top;
    document.body.scrollLeft = _scroll.left;
  }
}


/*
  Redirectiona para URL presente no browser no momento do login
*/
  var return_path = docCookies.getItem('return_path');
  if(return_path !== null) {
    docCookies.removeItem('return_path');
    window.location = return_path;
  }