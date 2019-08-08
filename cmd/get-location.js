const localization = require('../api-localization/geo-localization'),
    localizationUI = require('../menu-ui/location-ui'),
    commandBase = require('./command-base');

class getLocalization extends commandBase{
    constructor(){
        super('/getLocation');
    }

    async sendMessage(param, result) {
        let msg = `You are in ${result.address.country}\n`;
        msg += `Your current location is: ${result.display_name}. There are services available ${require('../emoji.js').party.three}\n`;
        msg += "Choose an option:\n";

        await this.bot.sendMessage(param.chat.id, msg, require('../menu-ui/main-menu-ui').menu(param.message_id, true));
    }

    async saveLocalizationOnCache(param, city){
        await this.redis.save(`user-location:${param.from.id}`, {
            latitude: param.location.latitude,
            longitude: param.location.longitude,
            city: city
        });
    }

    async sendErrorService(param){
        await this.bot.sendMessage(param.chat.id, ["There is no service available for your location yet. We do apologize"].join(";"));
    }

    async exec(param){
        this.bot.off("location");

        await this.bot.sendMessage(param.chat.id, "How can we contact you?", localizationUI.menu);
        await this.bot.on("location", async (msg) => {
            await this.bot.deleteMessage(msg.chat.id, msg.message_id);
            let result = await localization.getLocalization(msg.location.latitude, msg.location.longitude);
            await this.sendMessage(msg, result);
        });
    }
}

module.exports = getLocalization;
