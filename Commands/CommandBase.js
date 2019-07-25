class CommandBase {
    constructor(strCmd){
        this.strCmd = strCmd;
    }
   
    exec(bot, redis, param){
        return null;
    }
}

module.exports = CommandBase;