const {getLocalization, getStopByNumber, cancelInLine, cancelMainOperation, getRoute} = require('.'),
    cmds = [new getLocalization(), 
            new getStopByNumber(), 
            new cancelInLine(), 
            new cancelMainOperation(),
            new getRoute()];

/*
    Description: Choose a proper instance accord of a command informed.
*/
module.exports = {
    cmd : strCmd => cmds.filter(f => f.strCmd === strCmd)[0]
};