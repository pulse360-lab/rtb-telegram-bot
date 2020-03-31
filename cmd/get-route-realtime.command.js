const commandBase = require('./command-base'),
apiClient = require('../api/api-client');
let returnMenuUI = require('../menu-ui/return-menu-bus');

class getRouteRealTimeCommand extends commandBase{
    constructor(){
        super('/getRouteRealTime');
    }

    async routeNotFound (param, result){
        await this.bot.sendMessage(param.message.chat.id, `<code>${ result.error.message }</code>`, { parse_mode: 'HTML' });
        await this.sendMessageOptionOp(param);
    }

    async sendMessageOptionOp(param){
        let menu = returnMenuUI.menu(this.language, JSON.parse(param.parameters).stopId);
        await this.bot.sendMessage(param.message.chat.id, this.language.newroteMsg, menu);
    }

    async sendMessageResult(param, result){
        if(result.error){
            await this.routeNotFound(param, result);
            return;
        }

        let msg = `${this.language.routeInfo}: ${param.routeId} \n`;
        for (let index = 0; index < result.busInfo.length; index ++) {
            msg += '-------------------- \n';
            msg += `${this.language.origin}: ${result.busInfo[index].origin} \n`;
            msg += `${this.language.destination}: ${result.busInfo[index].destination} \n`;
            msg += `${this.language.dueTime}: ${result.busInfo[index].duetime} \n`;
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

module.exports = getRouteRealTimeCommand;