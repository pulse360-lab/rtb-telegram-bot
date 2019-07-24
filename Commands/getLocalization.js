const localization = require('../APIClients/APILocalization/MockAPILocalization'),
    localizationUI = require('../Interfaces/LocalizationUI'),
    menuUI = require('../Interfaces/MainMenuUI'),
    CommandBase = require('./CommandBase');


class getLocalization extends CommandBase{
    constructor(){
        super('/start');
    }
    exec(bot, param){
        bot.sendMessage(param.msg.chat.id, "How can we contact you?", localizationUI.menu).then(() => {
            bot.once("location",() => {
                    localization.getLocalization(param.msg.location.latitude, param.msg.location.longitude).then( result => {
                    bot.sendMessage(param.msg.chat.id, "Choose an option:", menuUI.menu);
                }).catch(err =>{
                    bot.sendMessage(param.msg.chat.id, ["There is no service available for your location yet. We do apologize"].join(";"));
                });
            });
        });
    }
}

module.exports = { getLocalization }