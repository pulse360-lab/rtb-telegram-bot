class CommandBase {
    constructor(cmd){
        this.cmd = cmd;
    }
    
    match(cmd){
        return this.cmd === cmd;
    }
    exec(bot, param){
        return null;
    }
}

module.exports = {CommandBase};