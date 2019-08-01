class commandBase {
    constructor(strCmd){
        this.strCmd = strCmd;
        this.redis = null;
    }
   
    exec(param){
        return null;
    }
}

module.exports = commandBase;