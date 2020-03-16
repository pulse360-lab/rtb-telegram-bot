const apiClient = require('../api/api-client'),
    locationUI = require('../menu-ui/location-ui'),
    menuUI = require('../menu-ui/main-menu-ui'),
    commandBase = require('./command-base');

class getLocation extends commandBase{
    constructor(){
        super('/getLocale');
    }

    async sendMessageYourContry(param, result) {
        await this.bot.sendMessage(param.chat.id, `You are in ${result.address.country}`)
    }

    async sendMessageAddress (param, result) {
        await this.bot.sendMessage(param.chat.id, `Your current location is: ${result.display_name}. There are services available ${require('../emoji.js').party.three}`)
    }

    async sendMenu(param){
        await this.bot.sendMessage(param.chat.id, "Choose an option:", menuUI.menu);
    }

    async sendErrorService(param){
        await this.bot.sendMessage(param.chat.id, ["There is no service available for your location yet. We do apologize"].join(";"));
    }

    async exec(param){
        this.bot.off("location");

        await this.bot.sendMessage(param.chat.id, "How can we contact you?", locationUI.menu);
        await this.bot.on("location", async (msg) => {

            let result = await apiClient.getLocale({
                userId: param.from.id, 
                latitude: msg.location.latitude, 
                longitude: msg.location.longitude
            });
            await this.sendMessageYourContry(msg, result);
            await this.sendMessageAddress(msg, result);
            await this.sendMenu(msg);
        });
    }
}

module.exports = getLocation;
