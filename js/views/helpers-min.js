Ember.Handlebars.helper("data-publicacao",function(){var a="";return a+=" <small>",a+=moment(this.data).calendar(),a+="</small>",new Handlebars.SafeString(a)});