const commandBase = require('./command-base'),
    menuUI = require('../menu-ui/cancel-menu-ui');

class getRoute extends commandBase{
    constructor(){
        super('/getRoute');
    }

    exec(param){
        this.bot.off('message');
        this.bot.sendMessage(param.message.chat.id, `This command is still in development! ${require('../emoji').crying}`);
        this.bot.sendMessage(param.message.chat.id, "Click in cancel to return to the previous menu: ", menuUI.menu);
    }
}

module.exports = getRoute;