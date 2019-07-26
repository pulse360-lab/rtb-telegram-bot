const {routeNotFoundError} = require('../helper/errors'),
    commandBase = require('./command-base');



class getStopByNumber extends commandBase{
    constructor(){
        super('/searchByStopNumber');
    }

    routeNotFound (param, result){
        this.bot.sendMessage(param.message.chat.id, `<code>${ result.message.error.message }</code>`, { parse_mode: 'HTML' })
                    .then(result => this.sendMessageOptionOp(param))
    }
    sendMessageOptionOp(param){
        let menuUI = require('../menu-ui/cancel-menu-ui');
        return Promise.resolve(this.bot.sendMessage(param.message.chat.id, "If you want to search a new bus stop, just put the number, otherwise, click in cancel to return to the previous menu:", menuUI.menu));
    }

    sendMessageResult(param, result){
        var msg = `Result for Stop number ${result.stopNumber} \n`;
      
        msg += 'Routes available: \n';
        this.bot.sendMessage(param.message.chat.id, '<code>' + msg + '</code>', { parse_mode: 'HTML' }) 
                .then(r => this.sendMenuListBusStop(param, result))
    }

    sendMenuListBusStop(param, result){
        var buttoms = [];
        
        for (let i = 0; i < result.busInfo.length; i++) {
            for (let j = 0; j < result.busInfo[i].routes.length; j++) {
                buttoms.push({
                    text: result.busInfo[i].routes[j],
                    callback_data: `/getRoute|${result.busInfo[i].routes[j]}`
                })
            }
       }

        let menuUI = require('../menu-ui/dynamic-menu');

        this.bot.sendMessage(param.message.chat.id, 'choose a route', menuUI.menu(buttoms))
                    .then(r => this.sendMessageOptionOp(param))
    }

    onMessage(param){
        this.bot.on('message', message => this.get(param, message.text));
    }

    get(param, stopNumber){
        this.redis.get(`user-location:${param.from.id}`)
                    .then(location =>{
                        var apiFactory = require('../api-clients/api-factory');
                        var api = apiFactory.getInstance(location.city);
                        
                        return Promise.resolve(api.getStopInformation(stopNumber));
                    })
                    .then(result => this.sendMessageResult(param, result))
                    .catch(routeNotFoundError, result => this.routeNotFound(param, result));
    }

    exec(param){
        let arr  = param.data.split('|');   
        arr && arr.length > 1 
            ? this.get(param, arr[1])
            : this.bot.sendMessage(param.message.chat.id, '<code>Type the bus stop number: </code>', { parse_mode: 'HTML' })
                        .then(result => this.onMessage(param));
    }
}
module.exports = getStopByNumber;