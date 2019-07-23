const localization = require('../APIClients/APILocalization/MockAPILocalization'),
    localizationUI = require('../Interfaces/LocalizationUI'),
    menuUI = require('../Interfaces/MainMenuUI');

const getLocalization = (msg, bot) =>{
 
    bot.sendMessage(msg.chat.id, "How can we contact you?", localizationUI.menu).then(() => {
        bot.once("location",(msg)=>{
            localization.getLocalization(msg.location.latitude, msg.location.longitude).then( result => {
               bot.sendMessage(msg.chat.id, [result.Message].join(";"), menuUI.menu);
                   // bot.sendMessage(msg.chat.id, "We will deliver your order to " + [msg.location.longitude,msg.location.latitude].join(";"));
            }).catch(err =>{
                bot.sendMessage(msg.chat.id, ["There is no service available for your location yet. We do apologize"].join(";"));
            });
        });
    });
}

module.exports = { getLocalization }