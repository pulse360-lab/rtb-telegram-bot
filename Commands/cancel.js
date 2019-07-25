const CommandBase = require('./CommandBase'),
    menuUI = require('../Interfaces/MainMenuUI');

class CancelInLine extends CommandBase{
    constructor(){
        super('/cancelInLine');
    }

    exec(bot, param){
        bot.off('message');
        bot.sendMessage(param.message.chat.id, "Choose an option:", menuUI.menu);
    }
}

class CancelMainOperation extends CommandBase{
    constructor(){
        super('/cancelMainOperation');
    }

    exec(bot, param){
        bot.off('message');
        bot.sendMessage(param.message.chat.id, `Thanks for using this bot. You will be very welcome in the future. ${require('../Emoji').winkingFace}`, { parse_mode: 'HTML' });
    }
}

module.exports = {CancelInLine, CancelMainOperation};