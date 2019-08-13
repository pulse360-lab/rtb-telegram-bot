const commandBase = require('./command-base');

class backMainMenu extends commandBase{
    constructor(){
        super('/backMainMenu');
    }

    async exec(param){
        await this.bot.off('message');

        let arr  = param.data.split('|');
        var json = JSON.parse(arr[1]);

        await this.bot.editMessageText("Choose an option:", {
            chat_id: param.message.chat.id,
            message_id: json.param.msgId,
            reply_markup: require('../menu-ui/main-menu-ui').menu(json.param.msgId, {
                "msgId" : json.param.msgId, 
                "typeText" : true
            }).reply_markup
        });
    }
}

module.exports = backMainMenu;
