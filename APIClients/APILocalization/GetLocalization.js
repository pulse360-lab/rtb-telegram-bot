const httpRequest = require('../HttpClient');
const {geoLocalization} = require('../../config.json').apis;
const {serviceUnavailable} = require('../../Errors');

// const places = [{
//     Id: cities.DUBLIN_ID,
//     Message: "Welcome to Dublin / Ireland u'\U+1F1EE', you can use this service to get information about Bus route, Bus Stop, time delay, etc",
//     getRealTimeEndpoint: "realtimebusinformation"
// },
// {
//     Id: 'Votorantim',
//     Message: "Welcome to Votorantim / Brazil, you can use this service to get information about Bus route, Bus Stop, time delay, etc",
//     getRealTimeEndpoint: "realtimebusinformation"
// },
// {
//     Id: cities.NetherlandsID,
//     Latitude: "5454",
//     Longitude: "454"
// }];

const getLocalizationByCoordinator = (latitude, longitude) => 
    Promise.resolve(httpRequest.get(`${geoLocalization.url}/reverse.php?key=${geoLocalization.token}&lat=${latitude}&lon=${longitude}&format=json`));

//Using Latitude and Longitude to get the current localization.
 const getLocalization = (latitude, longitude) => {
    return getLocalizationByCoordinator(latitude, longitude).then(result => {
       // var result = places.find(f => result.address.city.includes(f.Id));
        return result 
        ? Promise.resolve(result) 
        : Promise.reject(serviceUnavailable(`Sorry, unfortunately there is no service available for your current location. ${require('../../Emoji').crying}. We do apologize`));
    });
 }

module.exports = { getLocalization };