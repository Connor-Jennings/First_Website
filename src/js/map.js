
//This page contains the JavaScript for the map page 

//map initilization 
$(function() {
   var uluru = {lat: 37.73171, lng: -119.558694};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});

});





//removes links in menu after hovering
$(function() {
 
   var $listItems = $('li');
  
   $listItems.on('mouseout', function(){
      $(this).children('a').remove();
   });
});


