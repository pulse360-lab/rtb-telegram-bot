const commandBase = require('./command-base');

class help extends commandBase{
    constructor(){
        super('/help');
    }

    exec(param){
        this.bot.sendMessage(param.message.chat.id, '<code>' + routes + '</code>', { parse_mode: 'HTML' });
    }
}

module.exports = {help};