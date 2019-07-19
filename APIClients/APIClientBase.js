class APIClientBase{
    constructor(client){
        this.client = client;
    }

    getStopInformation(id){
        return null;   
    }

    setBaseUri(url){
        this.baseUrl = url;
    }
}

module.exports = APIClientBase;