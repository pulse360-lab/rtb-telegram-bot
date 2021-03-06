const apiClient = require('../api/api-client'),
    locationUI = require('../menu-ui/location-ui'),
    mainMenuUI = require('../menu-ui/main-menu-ui'),
    commandBase = require('./command-base');

const emoji = require('../emoji.js');

class getLocationCommand extends commandBase{
    constructor(){
        super('/start');
    }

    async sendMessage (param, result) {
        let msg = this.resource.currentLocation;
        msg = msg.replace('#display_name#', result.display_name);
        msg = msg.replace('#emoji#', emoji.party.three);
        msg += '\n';
        msg+= this.resource.chooseAnOption;

        let menu = mainMenuUI.menu(this.resource);
        await this.bot.sendMessage(param.chat.id, msg, menu);
    }

    async sendErrorService(param){
        await this.bot.sendMessage(param.chat.id, [this.resource.serviceUnavailable].join(";"));
    }

    async exec(param){
        this.bot.off("location");
        let menu = locationUI.menu(this.resource);
        await this.bot.sendMessage(param.chat.id, this.resource.howContactYou , menu);
        await this.bot.on("location", async (msg) => {
            let result = await apiClient.getLocale({
                language: this.language,
                userId: param.from.id, 
                latitude: msg.location.latitude, 
                longitude: msg.location.longitude
            });
            await this.sendMessage(msg, result);
        });
    }
}

module.exports = getLocationCommand;
