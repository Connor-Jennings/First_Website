


<?php //This page updates the data in the server when a new location is submitted  
	
	$title 		= $_POST['title'];
	$lat 		= $_POST['lat'];
	$lng 		= $_POST['lng'];
	$timeStamp  = $_POST['timeStamp'];
	$txt 		= $_POST['txt'];
	$status 	= $_POST['status'];
	
	//format data into JSON style
	$data = array(
		'title'      =>  $title,
		'lat'        =>  $lat, 		
	    'lng'        =>  $lng, 		
	    'timeStamp'  =>  $timeStamp,  
	    'txt'        =>  $txt, 		
	    'status'     =>  $status 	
	);
	//display data received
	echo " Title: $title<br> Latitude: $lat<br> Longitude: $lng<br> Timestamp: $timeStamp <br> Text: $txt <br> Status: $status <br>";
	
	
	
	//get path to trip from the trip list file
	$JSON = file_get_contents("../data/tripList.json");
	$jsonIterator = new RecursiveIteratorIterator(
		new RecursiveArrayIterator(json_decode($JSON, TRUE)),
		RecursiveIteratorIterator::SELF_FIRST);
	
	$path = 0; 
	foreach ($jsonIterator as $key => $val){
		if(!is_array($val)){
			if($val == $title) {
				print "IT WORKS :: :: :: $val<br/><br/><br/>";
				$path = $val;
			}
		}
	}
	
	if($path !== 0){
		$newJSON = file_get_contents($path);
		$tempArray = json_decode($newJSON);
		array_push($tempArray, $data);
		$JsonData = json_encode($data);
		file_put_contents($path, $newJsonString);
		echo '<p>Data Updated... <p> <p><a href="../addData.html">back</a></p>';
		exit;
	}
	
	echo '<p>New trip has been started..</p><a href="../addData.html">back</a></p>';
	

?>