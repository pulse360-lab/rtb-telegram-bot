const localization = require('../api-localization/geo-localization'),
    localizationUI = require('../interfaces/localization-ui'),
    menuUI = require('../Interfaces/main-menu-ui'),
    commandBase = require('../commands/command-base');

class getLocalization extends commandBase{
    constructor(){
        super('/start');
    }

    exec(bot, param){
        bot.sendMessage(param.chat.id, "How can we contact you?", localizationUI.menu).then(() => {
            bot.once("location",(msg) => {
                localization.getLocalization(msg.location.latitude, msg.location.longitude).then( result => {
                    bot.sendMessage(param.chat.id, `You are in ${result.address.country} ${require('../emoji').country[result.address.country]}`)
                    setTimeout(() =>
                         bot.sendMessage(param.chat.id, `Your current location is: ${result.display_name}. There are services available ${require('../emoji').party.three}`), 200);
                    
                    this.redis.save(`user-location:${param.from.id}`, msg.location);
                   
                    setTimeout(() => 
                     bot.sendMessage(param.chat.id, "Choose an option:", menuUI.menu), 300);
                }).catch(err =>{
                    bot.sendMessage(param.chat.id, ["There is no service available for your location yet. We do apologize"].join(";"));
                });
            });
        });
    }
}

module.exports = getLocalization;