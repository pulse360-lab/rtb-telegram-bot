const cities = require('./ConstantsCities');

export const Localization = [{
    Id: cities.DUBLIN_ID,
    Latitude: "44444",
    Longitude: "66666",
    APIBaseURL: ,
    getRealTimeEndpoint: "realtimebusinformation"
},
{
    Id: cities.NetherlandsID,
    Latitude: "5454",
    Longitude: "454",
    APIBaseURL: ""
}
];


//Using Latitude and Longitude to get the current localization.
export const GetLocalization = (latitude, longitude) => 
    Localization.find(f => f.Latitude === latitude && f.Longitude === longitude);