Toro.Router.map(function(){this.resource("ranking",function(){this.resource("candidato",{path:"/candidato/:slug"},function(){this.resource("mensagem",{path:"/mensagens/:id"})})}),this.resource("sobre"),this.resource("voto",{path:"/voto/:id/:slug/:voto"})}),Toro.MensagemRoute=Ember.Route.extend({model:function(o){return Ember.$.getJSON(Toro.configs.webservice_uri+"/comentarios/"+o.id)}}),Toro.VotoRoute=Ember.Route.extend({slug:null,model:function(o){return this.slug=o.slug,Ember.$.getJSON(Toro.configs.webservice_uri+"/voto/"+o.id+"/"+o.voto)},afterModel:function(o){o.response===!1&&alert(o.message),Toro.VotacaoView.reset(),this.transitionTo("candidato",this.slug)}}),Toro.RankingRoute=Ember.Route.extend({model:function(){return Ember.$.getJSON(Toro.configs.webservice_uri+"/candidatos")}}),Toro.CandidatoRoute=Ember.Route.extend({beforeModel:function(){this.controllerFor("application").set("isShowingMessages",!1)},model:function(o){return Ember.$.getJSON(Toro.configs.webservice_uri+"/candidato/"+o.slug)}});