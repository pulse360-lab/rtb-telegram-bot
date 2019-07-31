const redis = require('redis'),
    bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var client;
const createClient = () => client = redis.createClient();

const get = (key) => {
   return client.getAsync(key)
                    .then(result => Promise.resolve(JSON.parse(result)));
};

const save = (key, obj) => {
    var seconds = require('../config.json').cacheExpireTime; // TODO: put this value on config.json
    return Promise.resolve(client.setex(key, seconds, JSON.stringify(obj)));
}

module.exports = {createClient, get, save};