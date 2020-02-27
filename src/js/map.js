
//This page contains the JavaScript for the map page 

function LoadMenu(){
  $.getJSON('data/tripList.json')
  .done(function(data){
    var items = '<div class="heading"><h2>Trip Menu</h2></div>';
    for(i = 0; i<data.tripList.length; i++){
      items  += '<input type="" name="tripSelection" class="tripSelection" value="';
      items += data.tripList[i].path+'")>';
      items += '<label>'+ data.tripList[i].title + '</label>';
      items += '</input><br>';
    }
    $('#listOfTrips').html(items);
  })
  .fail(function(){
    $('#listOfTrips').html('something went wrong');
  });
}

function LoadMap(fileSelectionPath){                                //map initialization
  $.getJSON(fileSelectionPath)
  .done(function(data){
    var latLng = new google.maps.LatLng(parseFloat(data.trip[1].lat),parseFloat(data.trip[1].lng)); 
    var map = new google.maps.Map(                  																							//Create the map, centered at the first cords
      document.getElementById('map'), {zoom: 13, center: latLng });
    for(var i=1; i<data.trip.length; i++){																												//Insert all of the pins on the map
      var LatLong = new google.maps.LatLng(parseFloat(data.trip[i].lat),parseFloat(data.trip[i].lng)); 
      new google.maps.Marker({
        position: LatLong,
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
  
	LoadMenu();                        //Initialize the Menu
  LoadMap('data/testTrip.json');    //tripList.path  object in the file "tripList.json" 
  
  $('input.tripSelection').on('click', function(){this.html(this.value);});
  
  
  
  var $listItems = $('li');               //removes items in the menu after hovering
  $listItems.on('mouseout', function(){
     $(this).children('a').remove();
  });
});


