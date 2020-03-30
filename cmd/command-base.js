const resource = require('../language/resource');

class commandBase {
    constructor(strCmd){
        this.strCmd = strCmd;
        this.redis = null;
    }
   
    exec(param){
        return null;
    }

    config(param){
        this.param = param;
        this.language = resource.getResource(this.param ? this.param.language : null);
    }
}

module.exports = commandBase;