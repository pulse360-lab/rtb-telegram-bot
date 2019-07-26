const apiBase = require('../api-client-base');
const {routeNotFoundError} = require('../../helper/errors');

//let { stopInformationResponse }  = require('../../Contracts/');


class dublinApi extends apiBase{
    constructor(){
        super("Dublin");
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
                             return Promise.resolve(require('./reponses/stop-information').mapObjectResult(result));
                         });
    }
}

module.exports = dublinApi;