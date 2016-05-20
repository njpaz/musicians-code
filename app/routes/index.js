import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('bands', model.bands);
    controller.set('musicians', model.musicians);
    controller.get('bands')
  },
  model() {
    return Ember.RSVP.hash({
      bands: this.store.findAll('band'),
      musicians: this.store.findAll('musician'),
    })
  }
});
