class CommandBase {
    constructor(strCmd){
        this.strCmd = strCmd;
    }
   
    createParam(msg){
        return null;
    }

    exec(bot, param){
        return null;
    }
}

module.exports = CommandBase;