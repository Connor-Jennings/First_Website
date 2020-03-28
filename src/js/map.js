
//This page contains the JavaScript for the map page 

function LoadMenu(){                                          //loads in list of trip choices
  $.getJSON('data/tripList.json')
  .done(function(data){
    var items = '<div class="heading"><h2>Trip Menu</h2></div>';
    for(var i = 0; i<data.tripList.length; i++){
      items += '<input type="radio"';
      items += 'class="tripList"';
      items +=' name="tripList"';
      items +=' value="';
      items += data.tripList[i].path;
      items +='">';
      items += data.tripList[i].title;
      items += '<br>';
    }
    $('#listOfTripsd').html(items);
    $('#info').show();
  })
  .fail(function(){
    $('#listOfTrips').html('something went wrong... try refreshing');
    $('#info').hide();
  });
}

function LoadPinInfo(index, data){                              //Updating Info column when pin is selected
  if(data === 0){
    $('h3.infoTitle').text("click a pin, any pin");
    $('#timestamp').text("");
    $('#lat').text("");
    $('#lng').text("");
    $('#msg').text("");
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
  }
}

function ResizeMap(){
  var WindowWidth = window.innerWidth;
  $('#map').width(WindowWidth*0.7);
}

function LoadMap(fileSelectionPath){                                //map initialization
  LoadPinInfo(0,0);                                                   //reset pin info column
  $.getJSON(fileSelectionPath)
  .done(function(data){
    var latLng = new google.maps.LatLng(parseFloat(data.trip[1].lat),parseFloat(data.trip[1].lng)); 
    var map = new google.maps.Map(                  																							//Create the map, centered at the first cords
              document.getElementById('map'), {zoom: 13, center: latLng });
    for(var i = 1; i < data.trip.length; i++){																												//Insert all of the pins on the map
      var LatLong = new google.maps.LatLng(parseFloat(data.trip[i].lat),parseFloat(data.trip[i].lng)); 
      var marker = new google.maps.Marker({
        position: LatLong,
        map: map,
        zIndex: i
      });
      google.maps.event.addListener(marker,'click',function(){                //event listener for clicking on pins
        var index = this.getZIndex();
        LoadPinInfo(index, data);
      });
      ResizeMap();
    }
  }).fail(function(){
    alert("The map failed to load");
  });
}




$(function(){                                             //when DOM is ready
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
  LoadMap('data/testTrip.json');    // Initialize the Mao 
  
  
  $('input[value="Refresh_Map"]').on('click', function(){      //event listener for updating the map 
    var $valued = $('input:checked').val();
    LoadMap($valued);
  });
  
  $(window).on('resize',function(){           //Event Listener for Map resize 
    ResizeMap();
  });
  
});


