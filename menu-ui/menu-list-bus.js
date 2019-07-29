var menu = result =>{
    var buttoms = [];
        
    for (let i = 0; i < result.busInfo.length; i++) {
        for (let j = 0; j < result.busInfo[i].routes.length; j++) {
            buttoms.push({
                text: result.busInfo[i].routes[j],
                callback_data: `/getRouteRealTime|${result.busInfo[i].routes[j]}|${JSON.stringify(result.busInfo[i].params)}`
            })
        }
   }
   return buttoms;
}

module.exports = {menu};