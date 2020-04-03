


<?php //This page updates the data in the server when a new location is submitted  
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	
	
	//get input from form 
	$title 		= trim($_POST['title']);
	$lat 		= trim($_POST['lat']);
	$lng 		= trim($_POST['lng']);
	$timeStamp  = trim($_POST['timeStamp']);
	$text 		= $_POST['txt'];
	$status 	= trim($_POST['status']);
	
	//format data into JSON style
	$data = array(
		'lat'         =>  $lat, 		
	    'lng'         =>  $lng, 		
	    'timeStamp'   =>  $timeStamp,  
	    'text'        =>  $text, 		
	    'status'      =>  $status 	
	);
	
	//display input
	echo " Title: $title<br> Latitude: $lat<br> Longitude: $lng<br> Timestamp: $timeStamp <br> Text: $text <br> Status: $status <br>";
	
	//check for errors
	if($title ==="" || $lat ==="" || $lng ===""){
		exit;
	}
	
	
	
	//get path to trip
	$tripList = file_get_contents("../data/tripList.json");
	$jsonIterator = new RecursiveIteratorIterator(
		new RecursiveArrayIterator(json_decode($tripList, TRUE)),
		RecursiveIteratorIterator::SELF_FIRST);
	
	$path = 0;
	$getPath = FALSE;
	foreach ($jsonIterator as $key => $val){
		if(!is_array($val)){
			if($getPath === TRUE){
				$path = $val;
				$getPath = FALSE;
			}
			if($val == $title) {
				$getPath = TRUE;
			}
		}
		//print "key : $key  ||  val: $val <br>";
	}
	
	//update Last Known Location
	{
		$filePath = "../data/lastTransmission.json";
		$name = array('title' => 'Last Known');
		$Jdata = array('trip' => array($name, $data));
		$JsonData = json_encode($Jdata);
		file_put_contents("../data/lastTransmission.json", $JsonData);
	}
	
	//if the trip is already created, update it 
	if($path !== 0){
		$newJSON = file_get_contents("../$path");
		$tempArray = json_decode($newJSON, TRUE);
		array_push($tempArray["trip"], $data);
		$JsonData = json_encode($tempArray);
    
		file_put_contents("../$path", $JsonData);
		print("<br>Data :: <br>".$JsonData);
		echo '<p>Trip Updated... <p> <p><a href="../addData.html">back</a></p>';
		exit;
	}
	
	//Create new trip if the path doesn't match
	else{
		//create new file with provided data 
		$filePath = "data/$title.json";
		$name = array('title' => $title);
		$Jdata = array('trip' => array($name, $data));
		$JsonData = json_encode($Jdata);
		file_put_contents("../$filePath", $JsonData);
		
		//update the tripList
		$tempArray = json_decode($tripList, TRUE);
		$newTripInfo = array('title'=>$title, 'path'=>$filePath);
		array_push($tempArray["tripList"], $newTripInfo);
		$newTripList = json_encode($tempArray);
		file_put_contents("../data/tripList.json", $newTripList);
	}
	
	
	echo '<p>New trip has been started..</p><a href="../addData.html">back</a></p>';
	
?>

