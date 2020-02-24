
//This page contains the JavaScript for the map page 

$(function(){                                     //when DOM is ready
  
  $.ajax({
      beforeSend: function(xhr){
        if(xhr.ovverideMimeType){                    //If supported
            xhr.ovverideMimeType("application/json"); // Set MIME to prevent errors
         }
      }
   });
  
  
  function LoadMap(){                                //map initilization
    $.getJSON('data/testTrip.json')
    .done(function(data){
			var latitude = data.trip[0].lat;
			var longitude = data.trip[0].lng;
      var uluru = {lat: latitude, lng: longitude};  
      var map = new google.maps.Map(                  // The map, centered at Uluru
        document.getElementById('map'), {zoom: 4, center: uluru}
      );
      
      new google.maps.Marker({position: uluru, map: map}); // A marker, positioned at Uluru
    })
    .fail(function(){
      $('div.messageBoard').html('it failed to load');
    });
  }
  
  LoadMap();
  
  
  
  //removes items in the menu after hovering
  $(function() {
     var $listItems = $('li');
     $listItems.on('mouseout', function(){
        $(this).children('a').remove();
     });
  });

});
