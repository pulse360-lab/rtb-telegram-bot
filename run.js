const bluebird = require('bluebird');
global.Promise = bluebird;

var test = require('./APIClients/APIFactory');


var client = test.getInstance(require('./ConstantsCities').DUBLIN_ID);    
client.getInformation();