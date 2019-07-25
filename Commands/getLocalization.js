const localization = require('../APIClients/APILocalization/GetLocalization'),
    localizationUI = require('../Interfaces/LocalizationUI'),
    menuUI = require('../Interfaces/MainMenuUI'),
    CommandBase = require('./CommandBase')

class GetLocalization extends CommandBase{
    constructor(){
        super('/start');
    }

    exec(bot, param){
        bot.sendMessage(param.chat.id, "How can we contact you?", localizationUI.menu).then(() => {
            bot.once("location",(msg) => {
                localization.getLocalization(msg.location.latitude, msg.location.longitude).then( result => {
                    bot.sendMessage(param.chat.id, `You are in: ${result.display_name}. There are services available for your current location ${require('./../Emoji').party.three}`);
                    
                    this.redis.save(`user-location:${param.from.id}`, msg.location);
                   
                    setTimeout(() => bot.sendMessage(param.chat.id, "Choose an option:", menuUI.menu), 1000);
                }).catch(err =>{
                    bot.sendMessage(param.chat.id, ["There is no service available for your location yet. We do apologize"].join(";"));
                });
            });
        });
    }
}

module.exports = GetLocalization;