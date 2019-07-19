const APIClientBase = require('../APIClientBase');
var cities = require('../../ConstantsCities');

class DublinAPIClient extends APIClientBase{
    constructor(){
        super(cities.DUBLIN_ID);
    }

     getInformation(){
        console.log("Dublin API called");
    }
    
}

module.exports = DublinAPIClient;