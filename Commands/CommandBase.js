class CommandBase {
    constructor(strCmd){
        this.strCmd = strCmd;
    }
   
    exec(bot, param){
        return null;
    }
}

module.exports = CommandBase;