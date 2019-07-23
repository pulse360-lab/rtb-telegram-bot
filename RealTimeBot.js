const bluebird = require('bluebird');

global.Promise = bluebird;

const TelegramBot = require('node-telegram-bot-api'),
    json = require('./config.json');

const bot = new TelegramBot(json.authorizationToken, { polling: true }),
    INDEX_COMMAND = 1;

/**
 Start -> This is the first command used by the user to get the Localization and then he will be able to start surfing over the bot.
 */
bot.onText(/^\/start/, function (msg, match) {
    require('./Commands').localization.getLocalization(msg, bot);
});

    
bot.onText(/\/stop (.+)/, (msg, match) => {
    require('./Commands').stopNumber.getStopByNumber(msg, match, msg.location.latitude, msg.location.longitude);
});


bot.on('callback_query', (callbackQuery) => {
    const action = callbackQuery.data;
    var chatId = callbackQuery.message.chat.id;
    if(action === "searchByStopNumber"){
        bot.sendMessage(chatId, '<code>Type the command /stop [number]. For example: "/stop 123" </code>', { parse_mode: 'HTML' }).then(result =>{
            bot.on('message', message => {
                bot.sendMessage(chatId, 'Got a message');
                bot.off('message');
            });
        });
    }

   // bot.answerCallbackQuery(msg.id, 'Ok, here ya go!', callbackQuery);
  });


// bot.on('message', message => {
//     console.log('Got a message', message)
// });

bot.on('inline.query', function(message)
{
	// Received inline query
    console.log(message);
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

