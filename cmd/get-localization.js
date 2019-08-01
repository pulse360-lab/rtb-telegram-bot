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

    async saveLocalizationOnCache(param, msg, city){
        await this.redis.save(`user-location:${param.from.id}`, {
            latitude: msg.location.latitude,
            longitude: msg.location.longitude,
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
        await this.bot.sendMessage(param.chat.id, "How can we contact you?", localizationUI.menu);
        await this.bot.once("location", async (msg) => {
            let result = await localization.getLocalization(msg.location.latitude, msg.location.longitude);
            await this.saveLocalizationOnCache(param, msg, result.address.city);
            await this.sendMessageYourContry(param, result);
            await this.sendMessageAddress(param, result);
            await this.sendMenu(param);
        });
    }
}

module.exports = getLocalization;
