const bluebird = require('bluebird');


global.Promise = bluebird;

const TelegramBot = require('node-telegram-bot-api'),
    json = require('./config.json');

const bot = new TelegramBot(json.authorizationToken, { polling: true })

/**
 Start -> This is the first command used by the user to get the Localization and then he will be able to start surfing over the bot.
 */
bot.onText(/^\/start/, (msg, match) => {
    bot.sendMessage(msg.chat.id, `Welcome to Real Time Bus. This bot will help you to find the best route you need. Enjoy It  ${require('./emoji.js').smillingFace.openMouth}`, { parse_mode: 'HTML' });
    var cmd = require('./cmd/command-match').cmd(msg.text);
    cmd.bot = bot;
    cmd.exec(msg);
});


bot.on('callback_query', (callbackQuery) => {
    if(!callbackQuery.chat){
        callbackQuery.chat = callbackQuery.message.chat;
    }
    let arr  = callbackQuery.data.split('|');
    let action = arr[0];
    let cmd = require('./cmd/command-match').cmd(action);
    cmd.bot = bot;
    cmd.exec(callbackQuery);
});
