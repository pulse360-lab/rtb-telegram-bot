const commandBase = require('./command-base');
const {routeNotFoundError} = require('../helper/errors');

class getRouteRealTime extends commandBase{
    constructor(){
        super('/getRouteRealTime');
    }

    routeNotFound (param, result){
        this.bot.sendMessage(param.message.chat.id, `<code>${ result.message.error.message }</code>`, { parse_mode: 'HTML' })
                    .then(result => this.sendMessageOptionOp(param))
    }

    sendMessageOptionOp(param){
        let menuUI = require('../menu-ui/return-menu-bus');
        return Promise.resolve(this.bot.sendMessage(param.message.chat.id, "If you want to search a new rote, click in cancel to return to the previous menu:", menuUI.menu( JSON.parse(param.parameters).stopId)));
    }

    sendMessageResult(param, result){
        let msg = `RealTime information for Route: ${param.routeId} \n`;
        for (let index = 0; index < result.busInfo.length; index ++) {
            msg += '-------------------- \n';
            msg += `Origin: ${result.busInfo[index].origin} \n`;
            msg += `Destination: ${result.busInfo[index].destination} \n`;
            msg += `Due time in ${result.busInfo[index].duetime} \n`;
            
        }

        this.bot.sendMessage(param.message.chat.id, '<code>' + msg + '</code>', { parse_mode: 'HTML' }) 
                    .then(r => this.sendMessageOptionOp(param, result))
    }
    get(param){
        this.redis.get(`user-location:${param.from.id}`)
                    .then(location =>{
                        let apiFactory = require('../api-clients/api-factory');
                        let api = apiFactory.getInstance(location.city);
                        
                        return Promise.resolve(api.getRealTimeInformation(param.routeId, param.parameters));
                    })
                    .then(result => this.sendMessageResult(param, result))
                    .catch(routeNotFoundError, result => this.routeNotFound(param, result));
    }

    exec(param){
        let arr  = param.data.split('|');   
        if(arr && arr.length > 1){
            param.routeId = arr[1];
            param.parameters = arr[2];
            this.get(param)
        }
    }
}

module.exports = getRouteRealTime;