const httpClient = require('./http-client'),
config = require('../config.json')

const getLocale = async(param) =>{
    let apiParam = `?userId=${param.userId}&language=${param.language}&latitude=${param.latitude}&longitude=${param.longitude}`
    let result = await httpClient.get(`${ config.api.uri }locale${apiParam}`);
    return result;
}

const getRealTimeInfo = async(param) => {
    let apiParam  = `?userId=${param.userId}&language=${param.language}&stopNumber=${param.stopNumber}&routeId=${param.routeId}&operator=${param.operator}`;
    let result = await httpClient.get(`${ config.api.uri }realtime/info${apiParam}`);
    return result;
}

const getStopInformation = async(param) => {
    let result = await httpClient.get(`${ config.api.uri }realtime/bystop?userId=${param.userId}&language=${param.language}&stopNumber=${param.stopNumber}`);
    return result;
}

const getStopsNearMe = async(param) =>{
    let result = await httpClient.get(`${ config.api.uri }realtime/stopnear?userId=${param.userId}&language=${param.language}`);
    return result;
}


module.exports = { getLocale, getRealTimeInfo, getStopInformation, getStopsNearMe };