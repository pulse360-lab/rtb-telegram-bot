const commandBase = require('./command-base');
const menuLanguage = require('../menu-ui/language.ui');

class languageCmd extends commandBase {
    constructor(){
        super('/start');
    }

    async exec(param){
        await this.bot.sendMessage(param.chat.id, "Which language you want to select?", menuLanguage.menu);
    }
}

module.exports = languageCmd;