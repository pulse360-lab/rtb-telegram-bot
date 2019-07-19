class APIClientBase{
    constructor(client){
        this.client = client;
        this.httpClient = require('./HttpClient');
    }

    getStopInformation(id){
        return null;   
    }

    setBaseUri(url){
        this.baseUrl = url;
    }
}

module.exports = APIClientBase;