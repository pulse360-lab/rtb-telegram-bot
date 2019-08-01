const commandBase = require('./command-base');


class exit extends commandBase{
    constructor(){
        super('/exit');
    }

    exec(param){
        this.bot.off('message');
        this.bot.sendMessage(param.message.chat.id, `Thanks for using this bot. You will be very welcome in the future. ${require('../Emoji.js').winkingFace}`, { parse_mode: 'HTML' });
    }
}

module.exports = exit;
