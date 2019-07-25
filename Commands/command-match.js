const {getLocalization, getStopByNumber, cancelInLine, cancelMainOperation} = require('.'),
    cmds = [new getLocalization(), new getStopByNumber(), new cancelInLine(), new cancelMainOperation()];

/*
    Description: Choose a proper instance accord of a command informed.
*/
module.exports = {
    cmd : strCmd => cmds.filter(f => f.strCmd === strCmd)[0]
};