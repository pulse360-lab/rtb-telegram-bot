const {routeNotFoundError} = require('../helper/errors'),
    commandBase = require('./command-base');

const routeNotFound = (bot, chatId) => result => {
    return Promise.resolve(bot.sendMessage(chatId, `<code>${ result.message.error.message }</code>`, { parse_mode: 'HTML' }));
}

class getStopByNumber extends commandBase{
    constructor(){
        super('/searchByStopNumber');
    }

    sendMessageOptionOp(param){
        let menuUI = require('../interfaces/cancel-menu-ui');
        bot.sendMessage(param.message.chat.id, "If you want to search a new bus stop, just put the number, otherwise, click in cancel to return to the previous menu:", menuUI.menu);
    }

    sendMessageResult(param, message){
        return Promise.resolve(bot.sendMessage(param.message.chat.id, '<code>' + message + '</code>', { parse_mode: 'HTML' }));
    }

    createMessageBody(result){
            var msg = `Result for Stop number ${result.stopNumber} \n`;
            msg += 'Resbult for Bus: \n';
                       
                       for (let i = 0; i < result.busInfo.length; i++) {
                        msg += `Company Name: ${ result.busInfo[i].companyName } \n`;
       
                        msg += 'Routes available: \n';
                           for (let j = 0; j < result.busInfo[i].routes.length; j++) {
                            msg += `${ result.busInfo[i].routes[j] } \n`;
                           }
                       }
       return msg;
    }

    onMessage(param){
        this.bot.on('message', message => {
            this.redis.get(`user-location:${param.from.id}`)
                      .then(location =>{
                        var apiFactory = require('../api-clients/api-factory');
                        var api = apiFactory.getInstance(location.cityId);
                        api.getStopInformation(message.text)
                            .then(result => sendMessageResult(param, createMessageBody(result)))
                            .then(result => sendMessageOptionOp(param))
                            .catch(routeNotFoundError, routeNotFound(bot, param.message.chat.id));
                        });
        });
    }

    exec(param){
        this.bot.sendMessage(param.message.chat.id, '<code>Type the bus stop number: </code>', { parse_mode: 'HTML' }).then(result =>{
            this.onMessage(param);
        });
    }
}
module.exports = getStopByNumber;