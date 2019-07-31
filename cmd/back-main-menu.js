const commandBase = require('./command-base');

class backMainMenu extends commandBase{
    constructor(){
        super('/backMainMenu');
    }

    exec(param){
        this.bot.off('message');
        this.bot.sendMessage(param.message.chat.id, "Choose an option:", require('../menu-ui/main-menu-ui').menu);
    }
}

module.exports = backMainMenu;
