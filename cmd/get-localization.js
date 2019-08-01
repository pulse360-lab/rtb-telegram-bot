const localization = require('../api-localization/geo-localization'),
    localizationUI = require('../menu-ui/localization-ui'),
    menuUI = require('../menu-ui/main-menu-ui'),
    commandBase = require('./command-base');

class getLocalization extends commandBase{
    constructor(){
        super('/start');
    }

    async sendMessageYourContry(param, result) {
        await this.bot.sendMessage(param.chat.id, `You are in ${result.address.country}`)
    }

    async sendMessageAddress (param, result) {
        await this.bot.sendMessage(param.chat.id, `Your current location is: ${result.display_name}. There are services available ${require('../Emoji.js').party.three}`)
    }

    async saveLocalizationOnCache(param, city){
        await this.redis.save(`user-location:${param.from.id}`, {
            latitude: param.location.latitude,
            longitude: param.location.longitude,
            city: city
        });
    }

    async sendMenu(param){
        await this.bot.sendMessage(param.chat.id, "Choose an option:", menuUI.menu);
    }

    async sendErrorService(param){
        await this.bot.sendMessage(param.chat.id, ["There is no service available for your location yet. We do apologize"].join(";"));
    }

    async exec(param){
        this.bot.off("location");

        await this.bot.sendMessage(param.chat.id, "How can we contact you?", localizationUI.menu);
        await this.bot.on("location", async (msg) => {

            let result = await localization.getLocalization(msg.location.latitude, msg.location.longitude);
            await this.saveLocalizationOnCache(msg, result.address.city);
            await this.sendMessageYourContry(msg, result);
            await this.sendMessageAddress(msg, result);
            await this.sendMenu(msg);
        });
    }
}

module.exports = getLocalization;
