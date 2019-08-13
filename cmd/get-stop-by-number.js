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
    

    async sendMessageResult(param, result, msgId){
        let menuUI = require('../menu-ui/dynamic-menu');

        let msg = `Result for Stop number ${result.stopNumber} \n`;
        
        var par = {param: {
            msgId: msgId
           }}
      
        msg += 'Routes available: \n';
        await this.bot.sendMessage(param.message.chat.id, msg, menuUI.menu([this.createMsgRoutes(param, result), 
            [{text: '<< Back to the Main Menu', callback_data: `/backMainMenu| ${JSON.stringify(par)}`}]]
        ));
    }

    createMsgRoutes(param, result, msgId){
        let buttons = [];
        
        for (let i = 0; i < result.busInfo.length; i++) {
            for (let j = 0; j < result.busInfo[i].routes.length; j++) {
                buttons.push({
                    text: result.busInfo[i].routes[j],
                    callback_data: `/getRouteRealTime|${result.busInfo[i].routes[j]}|${JSON.stringify(result.busInfo[i].params)}`
                });
            }
       }

       return buttons;
    }

    async onMessage(param){
        await this.bot.on('message', message => this.get(param, message.text, message.message_id));
    }

    async get(param, stopNumber, msgId){
        let location = await this.redis.get(`user-location:${param.from.id}`)
        let apiFactory = require('../api-clients/api-factory');
        let api = apiFactory.getInstance(location.city);
        let result = await api.getStopInformation(stopNumber);                     
        await this.sendMessageResult(param, result, msgId);
    }

    async exec(param){
        this.bot.off('message');
        let arr  = param.data.split('|');
        var json = JSON.parse(arr[1]);
        if(json.param.typeText){
            await this.bot.editMessageText('Type the bus stop number or click on the button to back to the main menu!', {
                chat_id: param.message.chat.id,
                message_id: param.message.message_id,
                reply_markup: require('../menu-ui/back-main-menu-ui').menu({
                        msgId:  param.message.message_id
                    }).reply_markup
            });
            await this.onMessage(param);
        }
        else{
            await this.get(param, arr[1], json.param.msgId)
        }
    }
}
module.exports = getStopByNumber;