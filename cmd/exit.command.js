const commandBase = require('./command-base');


class exitCommand extends commandBase{
    constructor(){
        super('/exit');
    }

    exec(param){
        this.bot.off('message');
        let msg = this.language.thanksMsg;
        msg = msg.replace('#emoji#', require('../emoji.js').winkingFace)
        this.bot.sendMessage(param.message.chat.id, msg, { parse_mode: 'HTML' });
    }
}

module.exports = exitCommand;
