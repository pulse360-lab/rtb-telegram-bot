const localization = require('../APIClients/APILocalization/MockAPILocalization'),
    localizationUI = require('../Interfaces/LocalizationUI'),
    menuUI = require('../Interfaces/MainMenuUI'),
    CommandBase = require('./CommandBase');


class GetLocalization extends CommandBase{
    constructor(){
        super('/start');
    }

    createParam(msg){
        var param = {};
        param.chatId = msg.chat.id;
        return param;
    }

    exec(bot, param){
        bot.sendMessage(param.chatId, "How can we contact you?", localizationUI.menu).then(() => {
            bot.once("location",(msg) => {
                localization.getLocalization(msg.location.latitude, msg.location.longitude).then( result => {
                    bot.sendMessage(param.chatId, "Choose an option:", menuUI.menu);
                }).catch(err =>{
                    bot.sendMessage(param.chatId, ["There is no service available for your location yet. We do apologize"].join(";"));
                });
            });
        });
    }
}

module.exports = GetLocalization;