const cities = require('./ConstantsCities');
const httpRequest = require('./APIClients/HttpClient');

const places = [{
    Id: cities.DUBLIN_ID,
    Message: "Welcome to Dublin / Ireland u'\U+1F1EE', you can use this service to get information about Bus route, Bus Stop, time delay, etc",
    getRealTimeEndpoint: "realtimebusinformation"
},
{
    Id: 'Votorantim',
    Message: "Welcome to Votorantim / Brazil, you can use this service to get information about Bus route, Bus Stop, time delay, etc",
    getRealTimeEndpoint: "realtimebusinformation"
},
{
    Id: cities.NetherlandsID,
    Latitude: "5454",
    Longitude: "454"
}];

const getLocalizationByCoordinator = (latitude, longitude) => 
httpRequest.get(`https://eu1.locationiq.com/v1/reverse.php?key=pk.87bc595eae2ad911f1ba5cf7d854a8de&lat=${latitude}&lon=${longitude}&format=json`);
//(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);

//Using Latitude and Longitude to get the current localization.
 const getLocalization = (latitude, longitude) => {
    return getLocalizationByCoordinator(latitude, longitude).then(result => {
        var result = places.find(f => result.address.city.includes(f.Id));
        if (result)
            return Promise.resolve(result);
    });
    
  //  return "There is no service available for your location yet. We do apologize";
 }

module.exports = { getLocalization };