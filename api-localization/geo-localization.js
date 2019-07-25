const httpRequest = require('../helper/http-client');
const {apis} = require('../config.json');
const {serviceUnavailable} = require('../helper/errors');

const getLocalizationByCoordinator = (latitude, longitude) => 
    Promise.resolve(httpRequest.get(`${apis.geoLocalization.url}/reverse.php?key=${apis.geoLocalization.token}&lat=${latitude}&lon=${longitude}&format=json`));

//Using Latitude and Longitude to get the current localization.
 const getLocalization = (latitude, longitude) => {
    return getLocalizationByCoordinator(latitude, longitude).then(result => {
        return result 
        ? Promise.resolve(result) 
        : Promise.reject(serviceUnavailable(`Sorry, unfortunately there is no service available for your current location. ${require('../emoji').crying}. We do apologize`));
    });
 }

module.exports = { getLocalization };