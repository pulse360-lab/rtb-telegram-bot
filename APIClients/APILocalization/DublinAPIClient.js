const APIClientBase = require('../APIClientBase');
const cities = require('../../ConstantsCities');
const {routeNotFoundError} = require('../../Errors');

//let { stopInformationResponse }  = require('../../Contracts/');

let operators  = [{ shortName: "bac", completeName: 'Dublin Bus'  },{ shortName: "GAD", completeName: 'Go-Ahead Ireland'}];


const mapObjectResult = result => {
   // var obj = stopInformationResponse;
    var obj = {};
    obj.busInfo = [];
    obj.stopNumber = result.results[0].displaystopid;
    obj.stopName = result.results[0].fullname + " - " + result.results[0].shortnamelocalized;
    
        if(result.results[0].operators){
            result.results[0].operators.forEach(operator => {
            obj.busInfo.push({
                companyName: operators.find(f => f.shortName === operator.name) && operators.find(f => f.shortName === operator.name).completeName || "Operator name not found",
                routes: operator.routes
                });
            });
        }
    return obj;
}

class DublinAPIClient extends APIClientBase{
    constructor(){
        super(cities.DUBLIN_ID);
       super.setBaseUri("http://data.dublinked.ie/cgi-bin/rtpi/");
    }

    getStopInformation(id){
        return this.httpClient.get(`${ this.baseUrl }busstopinformation?stopid=${id}&format=json`)
                         .then((result) => {
                            if(result.errorcode == "1"){
                                var obj = {};
                                obj.error = {message: "Bus Stop not found"};
                                return Promise.reject(routeNotFoundError(obj));
                            }
                             return Promise.resolve(mapObjectResult(result));
                         });
    }
}

module.exports = DublinAPIClient;