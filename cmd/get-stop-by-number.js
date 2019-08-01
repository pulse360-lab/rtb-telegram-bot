const commandBase = require('./command-base');

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
        let msg = `Result for Stop number ${result.stopNumber} \n`;
      
        msg += 'Routes available: \n';
        await this.bot.sendMessage(param.message.chat.id, '<code>' + msg + '</code>', { parse_mode: 'HTML' });
        await this.sendMenuListBusStop(param, result);
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

        await this.bot.sendMessage(param.message.chat.id, 'choose a route', menuUI.menu([buttoms]));
        await this.sendMessageOptionOp(param);
    }

    async onMessage(param){
        await this.bot.on('message', message => this.get(param, message.text));
    }

    async get(param, stopNumber){
        let location = await this.redis.get(`user-location:${param.from.id}`)
        let apiFactory = require('../api-clients/api-factory');
        let api = apiFactory.getInstance(location.city);
        let result = await api.getStopInformation(stopNumber);                     
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