const list = require('./api-clients/dublin/route-list.json');

//Javascript for finding latitude and longitude range boundaries.
//Based on the excellent Java example by http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates




const stopsNearMe = () =>{
  var result = require('./helper/geo-location').get("53.399321", "-6.342247")
  var a = [];
  list.forEach(f => {
      if(f.latitude >= result.minLat && f.latitude <= result.maxLat && f.longitude >= result.minLon && f.longitude <= result.maxLon){
        a.push(f)
        console.log(f.displaystopid);
      }
  });

  //console.log(a);
}

stopsNearMe();