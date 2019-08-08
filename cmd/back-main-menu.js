const commandBase = require('./command-base');

class backMainMenu extends commandBase{
    constructor(){
        super('/backMainMenu');
    }

    async exec(param){
        await this.bot.off('message');

        await this.bot.editMessageText("Choose an option:", {
            chat_id: param.message.chat.id,
            message_id: param.message.message_id,
            reply_markup: require('../menu-ui/main-menu-ui').menu.reply_markup
        });
    }
}

module.exports = backMainMenu;
