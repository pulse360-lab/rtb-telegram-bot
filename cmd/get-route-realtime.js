const commandBase = require('./command-base');
//const {routeNotFoundError} = require('../helper/errors');

class getRouteRealTime extends commandBase{
    constructor(){
        super('/getRouteRealTime');
    }

    async routeNotFound (param, result){
        let menuUI = require('../menu-ui/return-menu-bus');
        await this.bot.editMessageText(result.message.error.message, {
            chat_id: param.message.chat.id,
            message_id: param.message.message_id,
            reply_markup: menuUI.menu(JSON.parse(param.parameters).stopId).reply_markup
        });
    }

    async sendMessageResult(param, result){
        let msg = `RealTime information for Route: ${param.routeId} \n`;
        for (let index = 0; index < result.busInfo.length; index ++) {
            msg += '-------------------- \n';
            msg += `Origin: ${result.busInfo[index].origin} \n`;
            msg += `Destination: ${result.busInfo[index].destination} \n`;
            msg += `Due time in ${result.busInfo[index].duetime} \n`;
        }

        let menuUI = require('../menu-ui/return-menu-bus');

        await this.bot.editMessageText(msg, {
            chat_id: param.message.chat.id,
            message_id: param.message.message_id,
            reply_markup: menuUI.menu(JSON.parse(param.parameters).stopId).reply_markup
        });
    }
    async get(param){
        let location = await this.redis.get(`user-location:${param.from.id}`);
        let apiFactory = require('../api-clients/api-factory');
        let api = apiFactory.getInstance(location.city);
                        
        let result = await api.getRealTimeInformation(param.routeId, param.parameters);
        await this.sendMessageResult(param, result);
    }

    async exec(param){
        let arr  = param.data.split('|');   
        if(arr && arr.length > 1){
            param.routeId = arr[1];
            param.msgId = arr[2];
            param.parameters = arr[3];
            await this.get(param);
        }
    }
}

module.exports = getRouteRealTime;