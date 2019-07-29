class apiClientBase{
    constructor(client){
        this.client = client;
        this.httpClient = require('../helper/http-client');
    }
    setBaseUri(url){
        this.baseUrl = url;
    }

    getStopInformation(id){
        return null;   
    }

    getRealTimeInformation(routeId, param){
        return null;
    }

    getAllStop(){
        
    }
}

module.exports = apiClientBase;