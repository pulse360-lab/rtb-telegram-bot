const redis = require('redis'),
    bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var client;
const createClient = () => client = redis.createClient();

const get = (key) => {
   return client.getAsync(key);
    // return client.get(key, (err, data) => {
    //    return Promise.resolve(JSON.parse(data));
    // });
};

const save = (key, obj) => {
    var seconds = 3600; // TODO: put this value on config.json
    client.setex(key, seconds, JSON.stringify(obj));
}

module.exports = {createClient, get, save};