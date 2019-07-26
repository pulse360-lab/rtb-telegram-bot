const localization = require('../api-localization/geo-localization'),
    localizationUI = require('../menu-ui/localization-ui'),
    menuUI = require('../menu-ui/main-menu-ui'),
    commandBase = require('./command-base');

class getLocalization extends commandBase{
    constructor(){
        super('/start');
    }

    sendMessageYourContry(param, result) {
        this.bot.sendMessage(param.chat.id, `You are in ${result.address.country}`)
        return Promise.resolve(result);
    }

    sendMessageAddress (param, result) {
        this.bot.sendMessage(param.chat.id, `Your current location is: ${result.display_name}. There are services available ${require('../emoji').party.three}`)
        return Promise.resolve(result);
    }

    saveLocalizationOnCache(param, msg, city){
        this.redis.save(`user-location:${param.from.id}`, {
            latitude: msg.location.latitude,
            longitude: msg.location.longitude,
            city: city
        });
    }

    sendMenu(param){
        this.bot.sendMessage(param.chat.id, "Choose an option:", menuUI.menu);
    }

    sendErrorService(param){
        this.bot.sendMessage(param.chat.id, ["There is no service available for your location yet. We do apologize"].join(";"));
    }

    exec(param){
        this.bot.sendMessage(param.chat.id, "How can we contact you?", localizationUI.menu).then(() => {
            this.bot.once("location",(msg) => {
                localization.getLocalization(msg.location.latitude, msg.location.longitude)
                .then(result =>  {
                    this.saveLocalizationOnCache(param, msg, result.address.city);
                    return this.sendMessageYourContry(param, result)
                })
                .then(result => this.sendMessageAddress(param, result))
                .then(result => this.sendMenu(param))
                .catch(err => this.sendErrorService(param));
            });
        });
    }
}

module.exports = getLocalization;