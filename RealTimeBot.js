const bluebird = require('bluebird');

global.Promise = bluebird;

const TelegramBot = require('node-telegram-bot-api'),
    json = require('./config.json');

const bot = new TelegramBot(json.authorizationToken, { polling: true }),
    INDEX_COMMAND = 1;

/**
 Start -> This is the first command used by the user to get the Localization and then he will be able to start surfing over the bot.
 */
bot.onText(/^\/start/, (msg, match) => {
    var cmd = require('./CommandMatch').cmd(msg.text);
    cmd.exec(bot, msg);
});


bot.on('callback_query', (callbackQuery, match) => {
    const action = callbackQuery.data;
    var t =  callbackQuery.data
    var id = match['|'];
    var cmd = require('./CommandMatch').cmd(action);
    cmd.exec(bot, callbackQuery);
});


bot.on('inline.query', function(message)
{
    // Received inline query
    console.log(message);
});