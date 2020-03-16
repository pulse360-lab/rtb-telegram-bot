const { languageCmd, getLocation, getStopByNumber, backMainMenu, exit, getRouteRealTime, getStopsNearMe, help } = require('.'),
    cmds = [new languageCmd(),
            new getLocation(), 
            new getStopByNumber(), 
            new backMainMenu(), 
            new exit(),
            new getRouteRealTime(),
            new getStopsNearMe(),
            new help()];

/*
    Description: Choose a proper instance accord of a command informed.
*/
module.exports = {
    cmd : strCmd => cmds.filter(f => f.strCmd === strCmd)[0]
};