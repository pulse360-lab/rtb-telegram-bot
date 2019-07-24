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
    var cmd = require('./CommandMatch').cmd(msg.text);
    cmd.exec(bot, cmd.createParam(msg));
});

// bot.onText(/\/stop (.+)/, (msg, match) => {
//     require('./Commands').stopNumber.getStopByNumber(msg, match, msg.location.latitude, msg.location.longitude);
// });

bot.on('callback_query', (callbackQuery) => {
    const action = callbackQuery.data;
    var chatId = callbackQuery.message.chat.id;
    var cmd = require('./CommandMatch').cmd(action);
    cmd.exec(bot, cmd.createParam(callbackQuery));
});

