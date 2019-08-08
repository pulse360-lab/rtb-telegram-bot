const commandBase = require('./command-base');


class exit extends commandBase{
    constructor(){
        super('/exit');
    }

    async exec(param){
        await this.bot.off('message');
        await this.bot.editMessageText(`Thanks for using this bot. You will be very welcome in the future. ${require('../emoji.js').winkingFace}`, {
            chat_id: param.message.chat.id,
            message_id: param.message.message_id
        });
    }
}

module.exports = exit;
