const commandBase = require('./command-base'),
    menuUI = require('../menu-ui/menu-update-address-ui');

class getStopsNearMe extends commandBase{
    constructor(){
        super('/getStopsNearMe');
    }

    async exec(param){
        let arr  = param.data.split('|');
        var json = JSON.parse(arr[1]);
        if(json.param.askUpdateLocate){
            await this.bot.sendMessage(param.message.chat.id, "Before bring stops near you, would you like to update your address?", menuUI.menu);
        }
        else{
            let location = await this.redis.get(`user-location:${param.from.id}`)
            let apiFactory = require('../api-clients/api-factory');
            let api = apiFactory.getInstance(location.city);
            let result = await api.getStopsNearMe({latitude: location.latitude, longitude: location.longitude});
            
            let msg = `Bus stops available near your location: \n`;

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
module.exports = getStopsNearMe;