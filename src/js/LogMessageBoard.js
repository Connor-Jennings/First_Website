
//This page contains the JavaScript for the Home page


function LoadTripData(path, cleardata){
	$.getJSON(path)
	.done(function(data){
		if(cleardata === false){
			for(var i = 1; i<data.trip.length; i++){
				var content = '<tr>';
				content += '<th>' + data.trip[i].timeStamp + '</th>';
				content += '<th>' + data.trip[i].lat + '</th>';
				content += '<th>' + data.trip[i].lng + '</th>';
				content += '<th>' + data.trip[i].text + '</th>';
				content += '<tr>';
				$('#Table').append(content);
			}
		}else{
			var content2 = '';
			for(var z = 1; z<data.trip.length; z++){
				content2 += '<tr>';
				content2 += '<th>' + data.trip[z].timeStamp + '</th>';
				content2 += '<th>' + data.trip[z].lat + '</th>';
				content2 += '<th>' + data.trip[z].lng + '</th>';
				content2 += '<th>' + data.trip[z].text + '</th>';
				content2 += '<tr>';
			}
			$('#Table').empty();
			$('#Table').html('<tr><th>Timestamp</th><th>Latitude</th><th>Longitude</th><th class="msg">Message</th></tr>');
			$('#Table').append(content2);
		}
	})
	.fail(function(){
	  alert('something went wrong... try refreshing');
	});
}



function LoadMenu(){                                          //loads in list of trip choices
  $.getJSON('data/tripList.json')
  .done(function(data){
    var items = '<input type="radio" class="tripList" name="tripList" value="allTrips"> All Trips  ';
    for(var i = 0; i<data.tripList.length; i++){
      items += '<input type="radio"';
      items += 'class="tripList"';
      items +=' name="tripList"';
      items +=' value="';
      items += data.tripList[i].path;
      items +='">  ';
      items += data.tripList[i].title;
    }
		items += '';
    $('#ControlPanel').prepend(items);
  })
  .fail(function(){
    alert('something went wrong... try refreshing');
  });
}



function InitializePage(loadMenu){                                          //loads in list of trip choices
  $.getJSON('data/tripList.json')
  .done(function(data){
		if(loadMenu === true){
			LoadMenu();
		}
    for(var i = 0; i<data.tripList.length; i++){
			LoadTripData(data.tripList[i].path, false);
    }
  })
  .fail(function(){
    alert('something went wrong... try refreshing');
  });
}



$(function(){
	
	InitializePage(true);
	
	$('input[value="Refresh_Log"]').on('click', function(){      //event listener for updating the Log
    var $valued = $('input:checked').val();
		if($valued === 'allTrips'){
				$('#Table').empty();
				$('#Table').html('<tr><th>Timestamp</th><th>Latitude</th><th>Longitude</th><th class="msg">Message</th></tr>');
				InitializePage(false);
		}else{
			LoadTripData($valued, true);
		}
  });
	 
});
