const CommandBase = require('./CommandBase'),
    menuUI = require('../Interfaces/MainMenuUI');

class Cancel extends CommandBase{
    constructor(){
        super('/cancel');
    }

    exec(bot, redis, param){
        bot.off('message');
        bot.sendMessage(param.message.chat.id, "Choose an option:", menuUI.menu);
    }
}

module.exports = Cancel;