const bluebird = require('bluebird');
global.Promise = bluebird;

const TelegramBot = require('node-telegram-bot-api'),
    json = require('./config.json'),
    exec = require('child_process').exec,
    execSpawn = require('child_process').spawn;

const realTimeBot = new TelegramBot(json.authorizationToken, { polling: true }),
    INDEX_COMMAND = 1;

realTimeBot.onText(/\/stop (.+)/, (msg, match) => {
    var test = require('./APIClients/APIFactory');
    var id = match[INDEX_COMMAND];

    var client = test.getInstance(require('./ConstantsCities').DUBLIN_ID);    
    client.getStopInformation(id)
            .then((result) =>{
                if(result.errorcode == "1"){
                    realTimeBot.sendMessage(chatId, '<code>Bus Stop not found</code>', { parse_mode: 'HTML' });
                    return;
                }
                
                var routes = 'Bus number: \n';
                
                for (let index = 0; index < result.results[0].operators[0].routes.length; index++) {
                    routes += result.results[0].operators[0].routes[index] + '\n';
                }

                realTimeBot.sendMessage(chatId, '<code>' + result.results[0].fullname + ' - ' + result.results[0].shortnamelocalized + '\n' + routes + '</code>', { parse_mode: 'HTML' });
            });

    const chatId = msg.chat.id;

});
