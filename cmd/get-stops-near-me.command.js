const commandBase = require('./command-base'),
    menuUI = require('../menu-ui/menu-update-address-ui'),
    apiClient = require('../api/api-client');


class getStopsNearMeCommand extends commandBase{
    constructor(){
        super('/getStopsNearMe');
    }

    async exec(param){
        let arr  = param.data.split('|');
        var json = JSON.parse(arr[1]);
        if(json.param.askUpdateLocate){
            let menu = menuUI.menu(this.language);
            await this.bot.sendMessage(param.message.chat.id, this.language.askUpdateLocale, menu);
        }
        else{
            let result = await apiClient.getStopsNearMe({
                userId: param.from.id
            });                     
            
            let msg = `${this.language.busStopAvailableNearMe}: \n`;

            var buttons = [];
            for (let i = 0; i < result.length; i++) {
                buttons.push([{
                    text: `${result[i].stopId} - ${result[i].name}`,
                    callback_data: `/searchByStopNumber|${result[i].stopId}`
                }]);
            }
    
            await this.bot.sendMessage(param.message.chat.id, msg, require('../menu-ui/dynamic-menu').menu(buttons)) ;
            
        }
    }
}
module.exports = getStopsNearMeCommand;