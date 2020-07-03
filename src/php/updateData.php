<?php //This page updates the data in the server when a new location is submitted  
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	

	// check for errors
	if(!isset($_POST['title']) || !isset($_POST['lat']) || !isset($_POST['lng'])){
	    echo '<p>Not enough data entered</p>';
		exit;
	}
	
	//get input from form 
	$title 		= trim($_POST['title']);
	$lat 		= trim($_POST['lat']);
	$lng 		= trim($_POST['lng']);
	$timeStamp  = trim($_POST['timeStamp']);
	$txt 		= $_POST['txt'];

	// attempt connection to database
	$db = new mysqli('localhost', 'pi', 'raspberry', 'Notitia');
	if(mysqli_connect_errno()){
		echo '<p>Error: Could not connect to database.<br/></p>';
		exit;
	}

	// display input
	echo " Title: $title<br> Latitude: $lat<br> Longitude: $lng<br> Timestamp: $timeStamp <br> Text: $txt ";
	
	$new_trip = false;
	// check if title is a new trip
	$query = "SELECT * FROM trip_list WHERE TITLE='".$title."'";
	$stmt = $db->prepare($query);
	$stmt->execute();
	$stmt->store_result();
	if($stmt->num_rows == 0){
		$new_trip = true;
	}

	// start new trip 
	if($new_trip){
		// add data to trip_log
		$log_query = "INSERT INTO trip_log (LAT, LNG, TIMESTMP, TXT) VALUES (?, ?, ?, ?)";
		$log_stmt = $db->prepare($log_query);
		$log_stmt->bind_param('ddss', $lat, $lng, $timeStamp, $txt);
		$log_stmt->execute();
		$log_stmt->store_result();

		// create new element in trip_list
		$list_query = "INSERT INTO trip_list (TITLE, FRST, LST ) VALUES ('".$title."', (SELECT MAX(IT) FROM trip_log), (SELECT MAX(IT) FROM trip_log));"; 
		$list_stmt = $db->prepare($list_query);
		$list_stmt->execute();
		$list_stmt->store_result();

		// check if anything was changed
		if($log_stmt->affected_rows > 0 && $list_stmt->affected_rows >0){
			echo '<p>New trip has been started </p><a href="../addData.html">BACK</a></p>';
		}
		else{
			echo '<p>Update Failed </p><a href="../addData.html">BACK</a></p>';
		}
		
		// free things up
		$log_stmt->free_result();
		$list_stmt->free_result();
	}
	else{ 
		// add data to trip_log
		$log_query = "INSERT INTO trip_log (LAT, LNG, TIMESTMP, TXT) VALUES (?,?,?,?)";
		$log_stmt = $db->prepare($log_query);
	    $log_stmt->bind_param('ddss', $lat, $lng, $timeStamp, $txt);
		$log_stmt->execute();
		$log_stmt->store_result();

		// update END marker for the current trip in trip_list
		$list_query = "UPDATE trip_list SET LST = (SELECT MAX(IT) FROM trip_log) WHERE TITLE = '".$title."';";
		$list_stmt = $db->prepare($list_query);
		$list_stmt->execute();
		$list_stmt->store_result();
		
		// check if anything was changed
		if($log_stmt->affected_rows > 0 && $list_stmt->affected_rows >0){
			echo '<p>Current trip has been updated </p><a href="../addData.html">BACK</a></p>';
		}
		else{
			echo '<p>Update Failed </p><a href="../addData.html">BACK</a></p>';
		}

		// free things up
		$log_stmt->free_result();
		$list_stmt->free_result();
	}

	// free everything up
	$stmt->free_result();
	$db->close();
?>

