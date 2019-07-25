const bluebird = require('bluebird');

const redisClient = require('./RedisClient');
redisClient.createClient();



global.Promise = bluebird;

const TelegramBot = require('node-telegram-bot-api'),
    json = require('./config.json');

const bot = new TelegramBot(json.authorizationToken, { polling: true })

/**
 Start -> This is the first command used by the user to get the Localization and then he will be able to start surfing over the bot.
 */
bot.onText(/^\/start/, (msg, match) => {
    var cmd = require('./CommandMatch').cmd(msg.text);
    cmd.exec(bot, redisClient, msg);
});


bot.on('callback_query', (callbackQuery) => {
    const action = callbackQuery.data;
    var cmd = require('./CommandMatch').cmd(action);
    cmd.exec(bot, redisClient, callbackQuery);
});


bot.on('inline.query', function(message)
{
    // Received inline query
    console.log(message);
});