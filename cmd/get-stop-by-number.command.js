const commandBase = require('./command-base');
apiClient = require('../api/api-client');
let backMenu = require('../menu-ui/back-menu-ui');

class getStopByNumberCommand extends commandBase{
    constructor(){
        super('/searchByStopNumber');
    }

    async routeNotFound (param, result){
        await this.bot.sendMessage(param.message.chat.id, `<code>${ result.message.error.message }</code>`, { parse_mode: 'HTML' });
        await this.sendMessageOptionOp(param);
    }
    async sendMessageOptionOp(param){
        let menu = backMenu.menu(this.language);
        await this.bot.sendMessage(param.message.chat.id, this.language.newroteMsg, menu);
    }
    
    async sendMessageResult(param, result){
        result.error
            ? await this.bot.sendMessage(param.message.chat.id, `<code>${ result.error.message }</code>`, { parse_mode: 'HTML' })
            : await this.sendMenuListBusStop(param, result);
    }

    async sendMenuListBusStop(param, result){
        let buttoms = [];
        
        for (let i = 0; i < result.busInfo.length; i++) {
            for (let j = 0; j < result.busInfo[i].routes.length; j++) {
                buttoms.push({
                    text: result.busInfo[i].routes[j],
                    callback_data: `/getRouteRealTime|${result.busInfo[i].routes[j]}|${JSON.stringify(result.busInfo[i].params)}`
                })
            }
       }

        let menuUI = require('../menu-ui/dynamic-menu');

        await this.bot.sendMessage(param.message.chat.id, this.language.routerAvailable + ':', menuUI.menu([buttoms]));
        await this.sendMessageOptionOp(param);
    }

    async onMessage(param){
        await this.bot.on('message', message => this.get(param, message.text));
    }

    async get(param, stopNumber){
        let result = await apiClient.getStopInformation({
            userId: param.from.id, 
            stopNumber: stopNumber
        });              
        await this.sendMessageResult(param, result);
    }

    async exec(param){
        this.bot.off('message');
        let arr  = param.data.split('|');   
        if(arr && arr.length > 1)
            await this.get(param, arr[1])
        else{
             await this.bot.sendMessage(param.message.chat.id, `<code>${this.language.typeBusStopNumber}: </code>`, { parse_mode: 'HTML' })
             await this.onMessage(param);
        }
    }
}
module.exports = getStopByNumberCommand;