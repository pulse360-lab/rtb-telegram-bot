const httpClient = require('./http-client'),
config = require('../config.json')

const getLocale = async(param) =>
    await httpClient.get(`${ config.api.uri }locale?userId=${param.userId}&latitude=${param.latitude}&longitude=${param.longitude}`);

const getRealTimeInfo = async(param) => {
    let result = await httpClient.get(`${ config.api.uri }realtime/info?userId=${param.userId}&stopNumber=${param.stopNumber}&routeId=${param.routeId}&operator=${param.operator}`);
    return result;
}

const getStopInformation = async(param) => {
    let result = await httpClient.get(`${ config.api.uri }realtime/bystop?userId=${param.userId}&stopNumber=${param.stopNumber}`);
    return result;
}

const getStopsNearMe = async(param) =>
    await httpClient.get(`${ config.api.uri }realtime/stopnear?userId=${param.userId}`);


module.exports = { getLocale, getRealTimeInfo, getStopInformation, getStopsNearMe };