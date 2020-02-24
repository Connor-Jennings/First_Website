
//This page contains the JavaScript for the map page 

$(function(){                                     //when DOM is ready
  
  $.ajax({
      beforeSend: function(xhr){
        if(xhr.ovverideMimeType){                    //If supported
            xhr.ovverideMimeType("application/json"); // Set MIME to prevent errors
         }
      }
   });
	
	function LoadMenu(){
		$.getJSON('data/testTrip.json')
		.done(function(data){
			var trip = data.trip;
			var item = '<input type="radio" name="trip" value="trip" > <a class="tripmenu">'+trip.text() + '</a><br>';
			$('div#listOfTrips').html(item);
		});
	}
  
  function LoadMap(){                                //map initilization
    $.getJSON('data/testTrip.json')
    .done(function(data){
			var latLng = new google.maps.LatLng(parseFloat(data.trip[0].lat),parseFloat(data.trip[0].lng)); 
      var map = new google.maps.Map(                  // The map, centered at Uluru
        document.getElementById('map'), {zoom: 13, center: latLng });
      
			new google.maps.Marker({
					position: latLng,
					map: map
			});
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
  
	LoadMenu();
  LoadMap();
  
  
  
  //removes items in the menu after hovering
  $(function() {
     var $listItems = $('li');
     $listItems.on('mouseout', function(){
        $(this).children('a').remove();
     });
  });

});
