const localization = require('../api-localization/geo-localization'),
    localizationUI = require('../menu-ui/location-ui'),
    commandBase = require('./command-base');

class getLocalization extends commandBase{
    constructor(){
        super('/getLocation');
    }

    //Send MessagerId = 0 because I am creating a new message rather than edit Message.
    async sendMessage(param, result) {
        var message = require('../helper/messages');
        await message.sendMessageMainMenu(this.bot, param, result);
    }

    async saveLocationOnCache(param, city){
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
            await this.saveLocationOnCache(msg, result.address.city);
            await this.sendMessage(msg, result);
        });
    }
}

module.exports = getLocalization;
