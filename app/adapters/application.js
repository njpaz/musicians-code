import RESTAdapter from 'ember-data/adapters/rest';

export default RESTAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    return `musicians.json?model=${modelName}`;
  },

  _handlePayload(payload) {
    return payload.map(function(pay) {
      let keys = Object.keys(pay);

      keys.forEach(function(key) {
        let camelKey = key.camelize();
        pay[key.camelize()] = pay[key];

        if (camelKey !== key) {
          delete pay[key];
        }
      });

      return pay;
    });
  },
  handleResponse(status, headers, payload, requestData) {
    let stripURLRegex = /.{1,}=/;
    let modelName = requestData.url.replace(stripURLRegex, '');
    let pluralModel = modelName.pluralize();
    let modelKey = pluralModel.capitalize();
    let formattedPayload = this._handlePayload(payload[modelKey]);
    let returnedObject = Ember.Object.create();

    returnedObject.set(pluralModel, payload[modelKey]);
    return returnedObject;
  }
});
