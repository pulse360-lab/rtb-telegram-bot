class APIClientBase{
    constructor(client){
        this.client = client;
        this.httpClient = require('./HttpClient');
    }
    setBaseUri(url){
        this.baseUrl = url;
    }

    getStopInformation(id){
        return null;   
    }

    getRealTimeInformation(id){

    }

    getAllStop(){
        
    }
}

module.exports = APIClientBase;