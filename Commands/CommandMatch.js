const {GetLocalization, GetStopByNumber} = require('.'),
    cmds = [new GetLocalization(), new GetStopByNumber()];

/*
    Description: Choose a proper instance accord a key is being expired.
*/
module.exports = {
    match : cmd => cmds.filter(f => f.cmd === cmd)[0]//.getClient(cityId) == cityId)[0]
};