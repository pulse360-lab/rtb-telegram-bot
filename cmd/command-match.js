const { languageCommand, getLocationCommand, getStopByNumberCommand, backMainMenuCommand, 
    exitCommand, getRouteRealTimeCommand, getStopsNearMeCommand, helpCommand } = require('.'),
    cmds = [new languageCommand(),
            new getLocationCommand(), 
            new getStopByNumberCommand(), 
            new backMainMenuCommand(), 
            new exitCommand(),
            new getRouteRealTimeCommand(),
            new getStopsNearMeCommand(),
            new helpCommand()];

/*
    Description: Choose a proper instance accord of a command informed.
*/
module.exports = {
    cmd : strCmd => cmds.filter(f => f.strCmd === strCmd)[0]
};