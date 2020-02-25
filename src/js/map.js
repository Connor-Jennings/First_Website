
//This page contains the JavaScript for the map page 

function LoadMenu(){
  $.getJSON('data/tripList.json')
  .done(function(data){
    var items = '<div class="heading"><h2>Trip Menu</h2></div>';
    for(i = 0; i<data.tripList.length; i++){
      items  += '<input type="radio" name="trip" value="trip" class="tripmenu">';
      items += data.tripList[i].title;
      items += '</input><br>';
    }
    $('div#listOfTrips').html(items);
  })
  .fail(function(){
    $('div#listOfTrips').html('something went wrong');
  });
}

function LoadMap(tripSelectionPath){                                //map initilization
  $.getJSON(tripSelectionPath)
  .done(function(data){
    var latLng = new google.maps.LatLng(parseFloat(data.trip[0].lat),parseFloat(data.trip[0].lng)); 
    var map = new google.maps.Map(                  																							//Create the map, centered at the first cords
      document.getElementById('map'), {zoom: 13, center: latLng });
    for(var i=0; i<data.trip.length; i++){																												//Insert all of the pins on the map
      latLng = new google.maps.LatLng(parseFloat(data.trip[i].lat),parseFloat(data.trip[i].lng)); 
      new google.maps.Marker({
        position: latLng,
        map: map
      });
    }
    var latLn = new google.maps.LatLng(2.8,-187.3);
    new google.maps.Marker({
        position: latLn,
        map: map
    });
  })
  .fail(function(){
    $('div.messageBoard').html('it failed to load');
  });
}


$(function(){                                     //when DOM is ready
  $.ajax({
      beforeSend: function(xhr){
        if(xhr.ovverideMimeType){                    //If supported
            xhr.ovverideMimeType("application/json"); // Set MIME to prevent errors
         }
      }
   });
  
	LoadMenu();                        //Initialize the menu
  LoadMap('data/testTrip.json');    //tripList.path  object in the file "tripList.json" 
  
  
  //removes items in the menu after hovering
  var $listItems = $('li');
  $listItems.on('mouseout', function(){
     $(this).children('a').remove();
  });
});


