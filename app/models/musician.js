import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import DS from 'ember-data';

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  band: DS.belongsTo('band')
});
