const commandBase = require('./command-base');
apiClient = require('../api/api-client');

class getStopByNumber extends commandBase{
    constructor(){
        super('/searchByStopNumber');
    }

    async routeNotFound (param, result){
        await this.bot.sendMessage(param.message.chat.id, `<code>${ result.message.error.message }</code>`, { parse_mode: 'HTML' });
        await this.sendMessageOptionOp(param);
    }
    async sendMessageOptionOp(param){
        let menuUI = require('../menu-ui/cancel-menu-ui');
        await this.bot.sendMessage(param.message.chat.id, "If you want to search a new bus stop, just put the number, otherwise, click in cancel to return to the previous menu:", menuUI.menu);
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

        await this.bot.sendMessage(param.message.chat.id, 'Routes available:', menuUI.menu([buttoms]));
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
             await this.bot.sendMessage(param.message.chat.id, '<code>Type the bus stop number: </code>', { parse_mode: 'HTML' })
             await this.onMessage(param);
        }
    }
}
module.exports = getStopByNumber;