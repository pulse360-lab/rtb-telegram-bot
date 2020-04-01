const commandBase = require('./command-base');

class helpCommand extends commandBase{
    constructor(){
        super('/help');
    }

    exec(param){
        this.bot.sendMessage(param.message.chat.id, '<code>This is your help session!</code>', { parse_mode: 'HTML' });
    }
}

module.exports = helpCommand;