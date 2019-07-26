const bluebird = require('bluebird');

const redisClient = require('./helper/redis-client');
redisClient.createClient();



global.Promise = bluebird;

const TelegramBot = require('node-telegram-bot-api'),
    json = require('./config.json');

const bot = new TelegramBot(json.authorizationToken, { polling: true })

/**
 Start -> This is the first command used by the user to get the Localization and then he will be able to start surfing over the bot.
 */
bot.onText(/^\/start/, (msg, match) => {
    bot.sendMessage(msg.chat.id, `Welcome to Real Time Bus. This bot will help you to find the best route you need. Enjoy It  ${require('./emoji').smillingFace.openMouth}`, { parse_mode: 'HTML' });
    var cmd = require('./cmd/command-match').cmd(msg.text);
    cmd.redis = redisClient;
    cmd.bot = bot;
    cmd.exec(msg);
});


bot.on('callback_query', (callbackQuery) => {
    let arr  = callbackQuery.data.split('|');
    let action = arr[0];
    let cmd = require('./cmd/command-match').cmd(action);
    cmd.redis = redisClient;
    cmd.bot = bot;
    cmd.exec(callbackQuery);
});