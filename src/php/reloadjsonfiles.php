<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    // --------------------  query database  ---------------------------
	$db = new mysqli('localhost', 'pi', 'raspberry', 'Notitia');
	if(mysqli_connect_errno()){
		exit;
    }

    // Get trip_list data 
    $list_query = "SELECT * FROM trip_list";
    $result = $db->query($list_query);
    
    $trip_list_array = array(); // I will want the names of the trips later so this is in a bigger scope
    $it = 0;                    // I will also want the number of trips 
    if ($result->num_rows > 0) {
        // fromat data from each frow 
        $obj = (object) ["title" => "Last_Transmission", "path"=> "data/lastTransmission.json"];
        $trip_list_array[$it] = $obj;
        $it += 1;
        while($row = $result->fetch_assoc()) {
            $row_obj = (object) ["title" => $row["TITLE"], "path"=> "data/".$row["TITLE"].".json"];
            $trip_list_array[$it] = $row_obj;
            $it += 1;
        }

        // Put data into tripList.json file
        $JSONdata = json_encode((object)["tripList"=> $trip_list_array]);
        file_put_contents("../data/tripList.json", $JSONdata);
    } 

    // For each trip in the database create a file and fill it with data 
     while($it >= 0){
        $title = $trip_list_array[$it]->title;
        $trip_query = "SELECT * FROM $title";
        $trip_result = $db->query($trip_query);

        if ($trip_result->num_rows > 0) {
            // fromat data from each frow 
            
            $item_number = 0;
            $list_array = array();
            while($row = $trip_result->fetch_assoc()) {
                if($item_number == 0){
                    $row_obj = (object) ["title" => $trip_list_array[$it]->title ] ;
                    $list_array[$item_number] = $row_obj;
            
                }
                $row_obj = (object) ["lat" => $row["LAT"], "lng"=> $row["LNG"], "timeStamp"=> (date("F j, Y, g:i:s a", $row["TIMESTMP"])), "unixtime"=> $row["TIMESTMP"], "bp"=> $row["AIRPRESSURE"], "text"=> $row["TXT"]];
                $list_array[$item_number] = $row_obj;
                
                $item_number += 1;
            }
   
            // Put data into JSON file
            $JSONdata = json_encode((object)["trip"=> $list_array]);
            file_put_contents("../data/".$trip_list_array[$it]->title.".json", $JSONdata);
    
        }
        $it -=1;
     }
     
    //update lastTransmission.json
    $title = $trip_list_array[$it]->title;
    $trip_query = "SELECT * FROM last_transmission";
    $trip_result = $db->query($trip_query);
    $row = $trip_result->fetch_assoc();
    $list_array = array();
    $list_array[0] = (object) ["title" => "Last Known Location" ];
    $list_array[1] = (object) ["lat" => $row["LAT"], "lng"=> $row["LNG"], "timeStamp"=> (date("F j, Y, g:i:s a", $row["TIMESTMP"])), "unixTime"=> $row["TIMESTMP"], "bp"=> $row["AIRPRESSURE"], "text"=> $row["TXT"]];
    
    $JSONdata = json_encode((object)["trip"=> $list_array]);
    file_put_contents("../data/lastTransmission.json", $JSONdata);
     
     
    $db->close();
?>