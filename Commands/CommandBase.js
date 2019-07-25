class CommandBase {
    constructor(strCmd){
        this.strCmd = strCmd;
        this.redis = null;
    }
   
    exec(bot, param){
        return null;
    }
}

module.exports = CommandBase;