const {getLocalization, getStopByNumber, cancelInLine, cancelMainOperation, getRouteRealTime} = require('.'),
    cmds = [new getLocalization(), 
            new getStopByNumber(), 
            new cancelInLine(), 
            new cancelMainOperation(),
            new getRouteRealTime()];

/*
    Description: Choose a proper instance accord of a command informed.
*/
module.exports = {
    cmd : strCmd => cmds.filter(f => f.strCmd === strCmd)[0]
};