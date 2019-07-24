const localization = require('../APIClients/APILocalization/MockAPILocalization'),
    localizationUI = require('../Interfaces/LocalizationUI'),
    menuUI = require('../Interfaces/MainMenuUI'),
    CommandBase = require('./CommandBase');


class GetLocalization extends CommandBase{
    constructor(){
        super('/start');
    }

    exec(bot, param){
        bot.sendMessage(param.chat.id, "How can we contact you?", localizationUI.menu).then(() => {
            bot.on("location",(msg) => {
                localization.getLocalization(msg.location.latitude, msg.location.longitude).then( result => {
                    bot.sendMessage(param.chat.id, "Choose an option:", menuUI.getMenu(msg.location.latitude, msg.location.longitude));
                }).catch(err =>{
                    bot.sendMessage(param.chat.id, ["There is no service available for your location yet. We do apologize"].join(";"));
                });
            });
        });
    }
}

module.exports = GetLocalization;