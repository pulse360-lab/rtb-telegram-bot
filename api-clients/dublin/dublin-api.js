const apiBase = require('../api-client-base');

class dublinApi extends apiBase{
    constructor(){
        super("Dublin");
        super.setBaseUri("http://data.dublinked.ie/cgi-bin/rtpi/");
    }

    async getStopInformation(id){
        let result = await this.httpClient.get(`${ this.baseUrl }busstopinformation?stopid=${id}&format=json`);

        return result.errorcode === "1" 
                                ? {error: {message: result.errormessage}} 
                                : require('./responses/stop-information').mapObjectResult(result);
    }

    async getRealTimeInformation(routeId, param){
        let objParameter = JSON.parse(param);
        let result = await this.httpClient.get(`${ this.baseUrl }realtimebusinformation?stopid=${objParameter.stopId}&routeid=${routeId}&operator=${objParameter.operator}`);

        return result.errorcode === "1" 
                                ? {error: {message: result.errormessage}} 
                                : require('./responses/realtime-information').mapObjectResult(result);
    }

    getStopsNearMe(param){
        
    }
}

module.exports = dublinApi;