
//This page contains the JavaScript for the map page 

$(function(){                                     //when DOM is ready
  
  $.ajax({
      beforeSend: function(xhr){
        if(xhr.ovverideMimeType){                    //If supported
            xhr.ovverideMimeType("application/json"); // Set MIME to prevent errors
         }
      }
   });
  
  
  function LoadMap(selection){                                //map initilization
    $getJSON('data/testTrip.JSON')
    .done(function(data){
      var uluru = {lat: data.selection[0].lat, lng: data.selection[0].lng};  
      var map = new google.maps.Map(                  // The map, centered at Uluru
        document.getElementById('map'), {zoom: 4, center: uluru}
      );
      
      var marker = new google.maps.Marker({position: uluru, map: map}); // A marker, positioned at Uluru
    })
    .fail(function(){
      $('div.messageBoard').html('it failed to load');
    });
  }
  
  LoadMap('trip');
  
  
  
  //removes items in the menu after hovering
  $(function() {
     var $listItems = $('li');
     $listItems.on('mouseout', function(){
        $(this).children('a').remove();
     });
  });

});
