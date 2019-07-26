const {routeNotFoundError} = require('../helper/errors'),
    commandBase = require('./command-base');

const routeNotFound = (bot, chatId) => result => {
    return Promise.resolve(bot.sendMessage(chatId, `<code>${ result.message.error.message }</code>`, { parse_mode: 'HTML' }));
}

class getStopByNumber extends commandBase{
    constructor(){
        super('/searchByStopNumber');
    }

    onMessage(param){
        this.bot.on('message', message => {
            this.redis.get(`user-location:${param.from.id}`).then(location =>{
                // TODO : call endpoint
            // var test = require('../APIClients/APIFactory');
            // var client = test.getInstance(require('../ConstantsCities').DUBLIN_ID);    
            // client.getStopInformation(message.text)
            //        .then(result => {
            //            var routes = `Result for Stop number ${result.stopNumber} \n`;
            //            routes += 'Resbult for Bus: \n';
                       
            //            for (let i = 0; i < result.busInfo.length; i++) {
            //                routes += `Company Name: ${ result.busInfo[i].companyName } \n`;
       
            //                routes += 'Routes available: \n';
            //                for (let j = 0; j < result.busInfo[i].routes.length; j++) {
            //                    routes += `${ result.busInfo[i].routes[j] } \n`;
            //                }
            //            }
       
            //            bot.sendMessage(param.message.chat.id, '<code>' + routes + '</code>', { parse_mode: 'HTML' });
            //            let menuUI = require('../Interfaces/cancel-menu-ui');
            //            bot.sendMessage(param.message.chat.id, "If you want to search a new bus stop, just put the number, otherwise, click in cancel to return to the previous menu:", menuUI.menu);
            //        })
            //        .catch(routeNotFoundError, routeNotFound(bot, param.message.chat.id));
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