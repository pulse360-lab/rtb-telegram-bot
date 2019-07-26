let operators  = [{ shortName: "bac", completeName: 'Dublin Bus'  },{ shortName: "GAD", completeName: 'Go-Ahead Ireland'}];

const mapObjectResult = result => {
     var obj = {};
     obj.busInfo = [];
     obj.stopNumber = result.results[0].displaystopid;
     obj.stopName = result.results[0].fullname + " - " + result.results[0].shortnamelocalized;
     
         if(result.results[0].operators){
             result.results[0].operators.forEach(operator => {
             obj.busInfo.push({
                 companyName: operators.find(f => f.shortName === operator.name) && operators.find(f => f.shortName === operator.name).completeName || "Operator name not found",
                 routes: operator.routes
                 });
             });
         }
     return obj;
 }

 module.exports = { mapObjectResult };