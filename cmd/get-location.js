const apiClient = require('../api/api-client'),
    locationUI = require('../menu-ui/location-ui'),
    menuUI = require('../menu-ui/main-menu-ui'),
    commandBase = require('./command-base');

const emoji = require('../emoji.js');

class getLocation extends commandBase{
    constructor(){
        super('/getLocale');
    }

    async sendMessageAddress (param, result) {
        // await this.bot.sendMessage(param.chat.id, `Your current location is: ${result.display_name}. There are services available ${require('../emoji.js').party.three}`)
        let msg = this.language.currentLocation;
        msg = msg.replace('#display_name#', result.display_name);
        msg = msg.replace('#emoji#', emoji.party.three);

        await this.bot.sendMessage(param.chat.id, msg);
    }

    async sendMenu(param){
        await this.bot.sendMessage(param.chat.id, this.language.chooseAnOption, menuUI.menu);
    }

    async sendErrorService(param){
        await this.bot.sendMessage(param.chat.id, [this.language.serviceUnavailable].join(";"));
    }

    async exec(param){
        this.bot.off("location");

        await this.bot.sendMessage(param.chat.id, this.language.howContactYou , locationUI.menu(this.language));
        await this.bot.on("location", async (msg) => {

            let result = await apiClient.getLocale({
                userId: param.from.id, 
                latitude: msg.location.latitude, 
                longitude: msg.location.longitude
            });
            await this.sendMessageAddress(msg, result);
            await this.sendMenu(msg);
        });
    }
}

module.exports = getLocation;
