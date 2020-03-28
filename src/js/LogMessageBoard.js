
//This page contains the JavaScript for the Home page


function LoadTripData(path){
	$.getJSON(path)
	.done(function(data){
		for(var i = 1; i<data.trip.length; i++){
			var content = '<tr class="' + path +'">';
			content += '<th>' + data.trip[i].timeStamp + '</th>';
			content += '<th>' + data.trip[i].lat + '</th>';
			content += '<th>' + data.trip[i].lng + '</th>';
			content += '<th>' + data.trip[i].text + '</th>';
			content += '</tr>';
			$('#Table').append(content);
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



function InitializePage(){                                          //loads in list of trip choices
  $.getJSON('data/tripList.json')
  .done(function(data){
		LoadMenu();
    for(var i = 0; i<data.tripList.length; i++){
			LoadTripData(data.tripList[i].path);
    }
  })
  .fail(function(){
    alert('something went wrong... try refreshing');
  });
}

function DisplayData($valued){
	if($valued === 'allTrips'){
		$('tr').show();
	}else{
		$('tr').hide();
		$('tr.head').show();
		$('tr[class="'+ $valued +'"]').show();
	}
}

$(function(){
	
	InitializePage();
	
	$('input[value="Refresh_Log"]').on('click', function(){      //event listener for updating the Log
    var $valued = $('input:checked').val();
		DisplayData($valued);
  });
	 
});
