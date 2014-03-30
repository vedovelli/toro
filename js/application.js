window.Toro = Ember.Application.create();

Toro.Store = DS.Store.extend({
  adapter: DS.FixtureAdapter
});

Toro.ApplicationAdapter = DS.FixtureAdapter;