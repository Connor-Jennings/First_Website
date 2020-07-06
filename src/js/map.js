
//This page contains the JavaScript for the map page 
//GLOABL variable bc im lazy
distn = 0;

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

function LoadMenu(){                                          //loads in list of trip choices
  $.getJSON('data/tripList.json')
  .done(function(data){
    var items = '<div class="heading"><h2>Trip Menu</h2></div>';
    for(var i = 0; i<data.tripList.length; i++){
      if(i == 0){
        items += '<input type="radio"';
        items += 'class="tripList"';
        items +=' name="tripList"';
        items +=' value="';
        items += data.tripList[i].path;
        items +='" checked>';
        items += data.tripList[i].title;
        items += '<br>';
      }else{
        items += '<input type="radio"';
        items += 'class="tripList"';
        items +=' name="tripList"';
        items +=' value="';
        items += data.tripList[i].path;
        items +='">';
        items += data.tripList[i].title;
        items += '<br>';
      }
    }
    $('#listOfTripsd').html(items);
    $('#info').show();
  })
  .fail(function(){
    $('#listOfTrips').html('something went wrong... try refreshing');
    $('#info').hide();
  });
}

function LoadPinInfo(index, data, distnce){                              //Updating Info column when pin is selected
  if(data === 0){
    $('h3.infoTitle').text("click a pin, any pin");
    $('#timestamp').text("");
    $('#lat').text("");
    $('#lng').text("");
    $('#msg').text("");
    $('#distance').text("");
  }else{
    $('h3.infoTitle').text("Location # "+index);
    $('#timestamp').text("Timestamp: "+data.trip[index].timeStamp);
    
    if(data.trip[index].lat > 0){
      $('#lat').text("Latitude :  "+data.trip[index].lat + " N");
    }else if(data.trip[index].lat < 0){
      $('#lat').text("Latitude :  "+data.trip[index].lat + " S");
    }else{
      $('#lat').text("Latitude :  "+data.trip[index].lat);
    }
    
    if(data.trip[index].lng > 0){
      $('#lng').text("Longitude: "+data.trip[index].lng + " E");
    }else if(data.trip[index].lng < 0){
      $('#lng').text("Longitude: "+data.trip[index].lng + " W");
    }else{
      $('#lng').text("Longitude: "+data.trip[index].lng);
    }  
    $('#msg').text("Message    : "+data.trip[index].text);


    $('#distance').text("Total distance for trip : " + distnce + " miles");
  }
}

function ResizeMap(){
  var WindowWidth = window.innerWidth;
  $('#map').width(WindowWidth*0.7);
}

function LoadMap(fileSelectionPath){                                //map initialization
  LoadPinInfo(0,0, distn);                                                   //reset pin info column
  $.getJSON(fileSelectionPath)
  .done(function(data){
    var latLng = new google.maps.LatLng(parseFloat(data.trip[1].lat),parseFloat(data.trip[1].lng)); 
    var map = new google.maps.Map(                  																							//Create the map, centered at the first cords
              document.getElementById('map'), {
                zoom: 13,
                center: latLng,
                mapTypeId: "terrain"
                });
    // polyline data
    
    var pathCords = [];

  
    for(var i = 1; i < data.trip.length; i++){																												//Insert all of the pins on the map
      var LatLong = new google.maps.LatLng(parseFloat(data.trip[i].lat),parseFloat(data.trip[i].lng)); 
      var marker = new google.maps.Marker({
        position: LatLong,
        map: map,
        zIndex: i
      });
      google.maps.event.addListener(marker,'click',function(){                //event listener for clicking on pins
        var index = this.getZIndex();
        LoadPinInfo(index, data, distn);
      });
      pathCords[i-1] = {'lat' : parseFloat(data.trip[i].lat), 'lng' : parseFloat(data.trip[i].lng)};
      ResizeMap();
    }
    var pathSketch = new google.maps.Polyline({
      path: pathCords,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    pathSketch.setMap(map);
    // calc distance for the trip 
    var it =0;
    while(it< pathCords.length-1){
      dist += distance(pathCords[it]['lat'], pathCords[it]['lng'], pathCords[it+1]['lat'], pathCords[it+1]['lng'])
      ++i;
    }

  }).fail(function(){
    alert("The map failed to load");
  });
}




$(function(){                                             //when DOM is ready
  $.get("php/reloadjsonfiles.php")                        // Update JSON files with data in the mysql server

  $.ajax({
      beforeSend: function(xhr){
        if(xhr.overrideMimeType){                      //If supported
            xhr.overrideMimeType("application/json"); // Set MIME to prevent errors
         }
      }
   });
  
  var WindowWidth = window.innerWidth;
  $('body').width(WindowWidth);
  
	LoadMenu();                        //Initialize the Menu
  LoadMap('data/lastTransmission.json');    // Initialize the Map
  
  
  $('input[value="Refresh_Map"]').on('click', function(){      //event listener for updating the map 
    var $valued = $('input:checked').val();
    LoadMap($valued);
  });
  
  $(window).on('resize',function(){           //Event Listener for Map resize 
    ResizeMap();
  });
  
});


