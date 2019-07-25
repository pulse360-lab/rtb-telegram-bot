const {GetLocalization, GetStopByNumber, CancelInLine, CancelMainOperation} = require('./Commands'),
    cmds = [new GetLocalization(), new GetStopByNumber(), new CancelInLine(), new CancelMainOperation()];

/*
    Description: Choose a proper instance accord of a command informed.
*/
module.exports = {
    cmd : strCmd => cmds.filter(f => f.strCmd === strCmd)[0]
};