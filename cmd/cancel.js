const commandBase = require('./command-base'),
    menuUI = require('../menu-ui/main-menu-ui');

class cancelInLine extends commandBase{
    constructor(){
        super('/cancelInLine');
    }

    exec(param){
        this.bot.off('message');
        this.bot.sendMessage(param.message.chat.id, "Choose an option:", menuUI.menu);
    }
}

class cancelMainOperation extends commandBase{
    constructor(){
        super('/cancelMainOperation');
    }

    exec(param){
        this.bot.off('message');
        this.bot.sendMessage(param.message.chat.id, `Thanks for using this bot. You will be very welcome in the future. ${require('../emoji').winkingFace}`, { parse_mode: 'HTML' });
    }
}

module.exports = {cancelInLine, cancelMainOperation};