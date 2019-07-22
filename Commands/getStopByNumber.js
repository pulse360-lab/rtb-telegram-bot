const {routeNotFoundError} = require('../Errors');

const getStopByNumber = (msg, bot, latitude, longitude) => {
    const chatId = msg.chat.id;
    const routeNotFound = result => {
        bot.sendMessage(chatId, `<code>${ result.message.error.message }</code>`, { parse_mode: 'HTML' });
    }
    
    var test = require('./APIClients/APIFactory');
    var id = match[INDEX_COMMAND];

    var client = test.getInstance(require('./ConstantsCities').DUBLIN_ID);    
    return client.getStopInformation(id)
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

                bot.sendMessage(chatId, '<code>' + routes + '</code>', { parse_mode: 'HTML' });
            })
            .catch(routeNotFoundError, routeNotFound);
}

module.exports = { getStopByNumber }