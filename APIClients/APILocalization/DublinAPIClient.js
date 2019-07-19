const APIClientBase = require('../APIClientBase'),
    HttpClient = require('../HttpClient');
var cities = require('../../ConstantsCities');

class DublinAPIClient extends APIClientBase{
    constructor(){
        super(cities.DUBLIN_ID);
        super.setBaseUri("https://data.smartdublin.ie/cgi-bin/rtpi/");
    }

     getStopInformation(id){
        return HttpClient.get(`${ this.baseUrl }/busstopinformation?stopid=${id}&format=json`)
    }
}

module.exports = DublinAPIClient;