const commandBase = require('./command-base'),
apiClient = require('../api/api-client');
//const {routeNotFoundError} = require('../helper/errors');

class getRouteRealTime extends commandBase{
    constructor(){
        super('/getRouteRealTime');
    }

    async routeNotFound (param, result){
        await this.bot.sendMessage(param.message.chat.id, `<code>${ result.message.error.message }</code>`, { parse_mode: 'HTML' });
        await this.sendMessageOptionOp(param);
    }

    async sendMessageOptionOp(param){
        let menuUI = require('../menu-ui/return-menu-bus');
        await this.bot.sendMessage(param.message.chat.id, "If you want to search a new rote, click in cancel to return to the previous menu:", menuUI.menu( JSON.parse(param.parameters).stopId));
    }

    async sendMessageResult(param, result){
        let msg = `RealTime information for Route: ${param.routeId} \n`;
        for (let index = 0; index < result.busInfo.length; index ++) {
            msg += '-------------------- \n';
            msg += `Origin: ${result.busInfo[index].origin} \n`;
            msg += `Destination: ${result.busInfo[index].destination} \n`;
            msg += `Due time in ${result.busInfo[index].duetime} \n`;
        }

        await this.bot.sendMessage(param.message.chat.id, '<code>' + msg + '</code>', { parse_mode: 'HTML' }) ;
        await this.sendMessageOptionOp(param, result);
    }
    async get(param){
        let objParameter = JSON.parse(param.parameters);
        let result = await apiClient.getRealTimeInfo({
            userId: param.from.id, 
            stopNumber: objParameter.stopId, 
            routeId: param.routeId, 
            operator: objParameter.operator 
        });
        await this.sendMessageResult(param, result);
    }

    async exec(param){
        let arr  = param.data.split('|');   
        if(arr && arr.length > 1){
            param.routeId = arr[1];
            param.parameters = arr[2];
            await this.get(param);
        }
    }
}

module.exports = getRouteRealTime;