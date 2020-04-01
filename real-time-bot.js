const bluebird = require('bluebird');
const resource = require('./language/resource');


global.Promise = bluebird;

const TelegramBot = require('node-telegram-bot-api'),
    json = require('./config.json');

const bot = new TelegramBot(json.authorizationToken, { polling: true })

/**
 Start -> This is the first command used by the user to get the Localization and then he will be able to start surfing over the bot.
 */

const createCmd = (action, param) => {
    let cmd = require('./cmd/command-match').cmd(action);
    cmd.bot = bot;
    cmd.setLanguage(param.from.language_code);
    cmd.exec(param);
}

bot.onText(/^\/start/, (msg, match) => {
    let language = resource.getResource(msg.from.language_code); 
    bot.sendMessage(msg.chat.id, language.welcome + " " + require('./emoji.js').smillingFace.openMouth, { parse_mode: 'HTML' }); 
    createCmd(msg.text, msg);
});


bot.on('callback_query', (callbackQuery) => {
    if(!callbackQuery.chat){
        callbackQuery.chat = callbackQuery.message.chat;
    }
    let arr  = callbackQuery.data.split('|');
    let action = arr[0];
    createCmd(action, callbackQuery);
});
