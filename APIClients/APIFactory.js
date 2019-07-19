const {DublinAPI} = require('./APILocalization'),
    apis = [new DublinAPI()];

/*
    Description: Choose a proper instance accord a key is being expired.
*/
module.exports = {
    getInstance : cityId => apis.filter(f => f.client === cityId)[0]//.getClient(cityId) == cityId)[0]
};