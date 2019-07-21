const bluebird = require('bluebird');
const {routeNotFoundError} = require('./Errors');
const localization = require('./MockAPILocalization');

global.Promise = bluebird;

const TelegramBot = require('node-telegram-bot-api'),
    json = require('./config.json');

const bot = new TelegramBot(json.authorizationToken, { polling: true }),
    INDEX_COMMAND = 1;
    
    bot.onText(/\/stop (.+)/, (msg, match) => {
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
});

// bot.on('callback_query', function onCallbackQuery(callbackQuery) {
//     const action = callbackQuery.data;
//     const msg = callbackQuery.message;
//     const opts = {
//       chat_id: msg.chat.id,
//       message_id: msg.message_id,
//     };
//     let text;
  
//     if (action === '1') {
//       text = 'You hit button 1';
//     }
  
//     bot.editMessageText(text, opts);
//   });

//   let url = process.env.URL || 'https://<PUBLIC-URL>';
  
//   bot.onText(/(.+)$/, function (msg, match) {
//     const opts = {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           {
//             text: 'Get My Location',
//             callback_data: 'location'
//           }
//         ]
//       ]
//     }
//   };

//   bot.sendMessage(msg.from.id, 'Welcome to Realtime bus', opts);
// });

// bot.on("callback_query", function onCallbackQuery(callbackQuery) {
//     // 'callbackQuery' is of type CallbackQuery
//    // console.log("query: ",callbackQuery);
//    bot.answerCallbackQuery(callbackQuery.id, { url });
// //    if(callbackQuery.data === 'location'){
// //         getLocation();
//   // }
// });

var getLocation = () => {

}



//   realTimeBot.onText(/^\/start$/, function (msg) {
//     const opts = {
//         reply_to_message_id: msg.message_id,
//         reply_markup: {
//             resize_keyboard: true,
//             one_time_keyboard: true,
//             keyboard: [[
//                 {text: 'Add Option', callback_data: 'stop'},
//                 {text: 'Send', callback_data: 'send'},
//                 {text: 'Delete', callback_data: 'delete'}
//   ]],
            
//         }
//     };

//     realTimeBot.sendMessage(msg.chat.id, "I'm a test robot", opts);
// });

//   realTimeBot.on('message', (msg) => {
//     const chatId = msg.chat.id;
  
//     // send a message to the chat acknowledging receipt of their message
//     realTimeBot.sendMessage(chatId, 'Received your message');
//   });

bot.onText(/^\/hi/, function (msg, match) {
    var option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "My Localization",
                request_location: true
            }], ["Cancel"]]
        }
    };
    bot.sendMessage(msg.chat.id, "How can we contact you?", option).then(() => {
        bot.once("location",(msg)=>{
            localization.getLocalization(msg.location.latitude, msg.location.longitude).then( result => {
                bot.sendMessage(msg.chat.id, [result.Message].join(";"));
                   // bot.sendMessage(msg.chat.id, "We will deliver your order to " + [msg.location.longitude,msg.location.latitude].join(";"));
            }).catch(err =>{
                bot.sendMessage(msg.chat.id, ["There is no service available for your location yet. We do apologize"].join(";"));
            });
        });
    });
});