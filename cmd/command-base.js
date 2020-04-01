const resource = require('../language/resource')


class commandBase {
    constructor(strCmd){
        this.strCmd = strCmd;
    }
   
    exec(param){
        return null;
    }

    setLanguage(language){
        this.language = language;
        this.resource = resource.getResource(language);
    }
}

module.exports = commandBase;