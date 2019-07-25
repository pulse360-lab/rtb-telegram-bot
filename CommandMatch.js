const {GetLocalization, GetStopByNumber} = require('./Commands'),
    cmds = [new GetLocalization(), new GetStopByNumber()];

/*
    Description: Choose a proper instance accord a key is being expired.
*/
module.exports = {
    cmd : strCmd => cmds.filter(f => f.strCmd === strCmd)[0]
};