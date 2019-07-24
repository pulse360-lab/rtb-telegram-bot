const {routeNotFoundError} = require('../Errors'),
    CommandBase = require('./CommandBase');

const routeNotFound = bot => result => {
    return Promise.resolve(bot.sendMessage(chatId, `<code>${ result.message.error.message }</code>`, { parse_mode: 'HTML' }));
}

class GetStopByNumber extends CommandBase{
    constructor(){
        super('/searchByStopNumber');
    }

    createParam(msg){
        
    }

    exec(bot, param){
        bot.sendMessage(chatId, '<code>Type the bus stop number: </code>', { parse_mode: 'HTML' }).then(result =>{
            bot.on('message', message => {
                var test = require('../APIClients/APIFactory');
                var client = test.getInstance(require('../ConstantsCities').DUBLIN_ID);    
                return client.getStopInformation(message.text)
                       .then(result => {
                           var routes = `Result for Stop number ${result.stopNumber} \n`;
                           routes += 'Result for Bus: \n';
                           
                           for (let i = 0; i < result.busInfo.length; i++) {
                               routes += `Company Name: ${ result.busInfo[i].companyName } \n`;
           
                               routes += 'Routes available: \n';
                               for (let j = 0; j < result.busInfo[i].routes.length; j++) {
                                   routes += `${ result.busInfo[i].routes[j] } \n`;
                               }
                           }
           
                           bot.sendMessage(param.msg.chat.id, '<code>' + routes + '</code>', { parse_mode: 'HTML' });
                           bot.sendMessage(chatId, "Choose an option:", menuUI.menu);
                       })
                       .catch(routeNotFoundError, routeNotFound(bot));
                });
                let menuUI = require('./Interfaces/MainMenuUI');
                bot.off('message');
            });
    }
}
module.exports = GetStopByNumber;