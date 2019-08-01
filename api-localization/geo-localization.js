const httpRequest = require('../helper/http-client');
const {apis} = require('../config.json');

const getLocalizationByCoordinator = async (latitude, longitude) => 
    await httpRequest.get(`${apis.geoLocalization.url}/reverse.php?key=${apis.geoLocalization.token}&lat=${latitude}&lon=${longitude}&format=json`);

//Using Latitude and Longitude to get the current localization.
 const getLocalization = async (latitude, longitude) => {
    let result = await getLocalizationByCoordinator(latitude, longitude);
    return result ? result : `Sorry, unfortunately there is no service available for your current location. ${require('../Emoji.js').crying}. We do apologize`;
 }

module.exports = { getLocalization };
