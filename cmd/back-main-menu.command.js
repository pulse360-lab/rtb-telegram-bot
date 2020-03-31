const commandBase = require('./command-base');
const mainMenu = require('../menu-ui/main-menu-ui')
class backMainMenuCommand extends commandBase{
    constructor(){
        super('/backMainMenu');
    }

    exec(param){
        this.bot.off('message');
        let menu = mainMenu.menu(this.language);
        this.bot.sendMessage(param.message.chat.id, this.language.chooseAnOption, menu);
    }
}

module.exports = backMainMenuCommand;
