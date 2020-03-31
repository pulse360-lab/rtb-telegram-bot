const commandBase = require('./command-base');
const menuLanguage = require('../menu-ui/language.ui');

class languageCommand extends commandBase {
    constructor(){
        super('/language');
    }

    async exec(param){
        await this.bot.sendMessage(param.chat.id, "Which language you want to select?", menuLanguage.menu);
    }
}

module.exports = languageCommand;