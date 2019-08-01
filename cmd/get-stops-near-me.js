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
            await this.bot.sendMessage(param.message.chat.id, "ok, lets take stops near you");
        }
    }
}
module.exports = getStopsNearMe;