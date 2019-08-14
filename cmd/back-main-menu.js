const commandBase = require('./command-base');

class backMainMenu extends commandBase{
    constructor(){
        super('/backMainMenu');
    }

    async exec(input){
        await this.bot.off('message');
        var obj = require('../helper/callback-pattern').extract(input);

        var message = require('../helper/messages');
        await message.editMessageMainMenu(this.bot, input, obj);
    }
}

module.exports = backMainMenu;
