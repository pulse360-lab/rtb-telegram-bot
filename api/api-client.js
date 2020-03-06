const httpClient = require('./http-client'),
config = require('../config.json')

const getLocale = async(param) =>
    await httpClient.get(`${ config.api.uri }v1/locale?userId=${param.userId}&latitude=${param.latitude}&longitude=${param.longitude}`);

const getRealTimeInfo = async(param) =>
    await httpClient.get(`${ config.api.uri }v1/realtime/info?userId=${param.userId}&stopNumber=${param.stopNumber}&routeId=${param.routeId}&operator=${param.operator}`);

const getStopInformation = async(param) =>
    await httpClient.get(`${ config.api.uri }v1/realtime/bystop?userId=${param.userId}&stopNumber=${param.stopNumber}`);

const getStopsNearMe = async(param) =>
    await httpClient.get(`${ config.api.uri }v1/realtime/stopnear?userId=${param.userId}`);


module.exports = { getLocale, getRealTimeInfo, getStopInformation, getStopsNearMe };