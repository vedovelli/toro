Toro.CandidatoController=Ember.ObjectController.extend({actions:{voto_favor:function(o,t){this.transitionToRoute("voto",o,t,"favor")},voto_contra:function(o,t){this.transitionToRoute("voto",o,t,"contra")}}});