const apiBase = require('../api-client-base');
const {routeNotFoundError} = require('../../helper/errors');

class dublinApi extends apiBase{
    constructor(){
        super("Dublin");
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
                             return Promise.resolve(require('./responses/stop-information').mapObjectResult(result));
                         });
    }

    getRealTimeInformation(routeId, param){
        var objParameter = JSON.parse(param);
        return this.httpClient.get(`${ this.baseUrl }realtimebusinformation?stopid=${objParameter.stopId}&routeid=${routeId}&operator=${objParameter.operator}`)
        .then((result) => {
           if(result.errorcode === "1"){
               var obj = {};
               obj.error = {message: "Bus Stop not found"};
               return Promise.reject(routeNotFoundError(obj));
           }
            return Promise.resolve(require('./responses/realtime-information').mapObjectResult(result));
        });
    }
}

module.exports = dublinApi;