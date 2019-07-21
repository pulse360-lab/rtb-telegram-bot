const APIClientBase = require('../../APIClientBase');
const cities = require('../../../ConstantsCities');
const {routeNotFoundError} = require('../../../Errors');

//let { stopInformationResponse }  = require('../../Contracts/');


class DublinAPIClient extends APIClientBase{
    constructor(){
        super(cities.DUBLIN_ID);
        super.setBaseUri("http://data.dublinked.ie/cgi-bin/rtpi/");
       //https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?format=json&stopid=2510
    }

    getStopInformation(id){
        return this.httpClient.get(`${ this.baseUrl }busstopinformation?stopid=${id}&format=json`)
                         .then((result) => {
                            if(result.errorcode == "1"){
                                var obj = {};
                                obj.error = {message: "Bus Stop not found"};
                                return Promise.reject(routeNotFoundError(obj));
                            }
                             return Promise.resolve(require('./StopInformation').mapObjectResult(result));
                         });
    }

    getRealTimeInformation(id){
        return this.httpClient.get(`${ this.baseUrl }realtimebusinformation?stopid=${id}&format=json`)
        .then((result) => {
           if(result.errorcode == "1"){
               var obj = {};
               obj.error = {message: "Bus Stop not found"};
               return Promise.reject(routeNotFoundError(obj));
           }
            return Promise.resolve(require('./StopInformation').mapObjectResult(result));
        });
    }
}

module.exports = DublinAPIClient;