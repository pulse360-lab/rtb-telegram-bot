const bluebird = require('bluebird');
const {routeNotFoundError} = require('./Errors');

global.Promise = bluebird;

const TelegramBot = require('node-telegram-bot-api'),
    json = require('./config.json'),
    exec = require('child_process').exec,
    execSpawn = require('child_process').spawn;

const realTimeBot = new TelegramBot(json.authorizationToken, { polling: true }),
    INDEX_COMMAND = 1;

realTimeBot.onText(/\/stop (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const routeNotFound = result => {
        realTimeBot.sendMessage(chatId, `<code>${ result.message.error.message }</code>`, { parse_mode: 'HTML' });
    }
    
    var test = require('./APIClients/APIFactory');
    var id = match[INDEX_COMMAND];

    var client = test.getInstance(require('./ConstantsCities').DUBLIN_ID);    
    return client.getStopInformation(id)
            .then(result => {
                // if(result.errorcode == "1"){
                //     realTimeBot.sendMessage(chatId, '<code>Bus Stop not found</code>', { parse_mode: 'HTML' });
                //     return;
                // }
                var routes = `Result for Stop number ${result.stopNumber} \n`;
                routes += 'Result for Bus: \n';
                
                for (let i = 0; i < result.busInfo.length; i++) {
                    routes += `Company Name: ${ result.busInfo[i].companyName } \n`;

                    routes += 'Routes available: \n';
                    for (let j = 0; j < result.busInfo[i].routes.length; j++) {
                        routes += `${ result.busInfo[i].routes[j] } \n`;
                    }
                }

                 realTimeBot.sendMessage(chatId, '<code>' + routes + '</code>', { parse_mode: 'HTML' });
            })
            .catch(routeNotFoundError, routeNotFound);
           // .catch(err,  realTimeBot.sendMessage(chatId, `<code>${ err }</code>`, { parse_mode: 'HTML' }));
});
